import React, { useContext, useEffect, useMemo, useState, useCallback } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { useAxios, useLazyAxios } from "use-axios-client"
import { objectKeyToCamelCase, capitalize, randomNumber } from "../helpers/general"
import { STORED_CARD_20220508, TEST_DECK } from '../constants/cardConstants'
import { useToggle } from "../hooks/useToggle"
import { useCardsContext } from "./CardsContext"
import axios from "axios"
const DeckTriviaContext = React.createContext()

export const useDeckTriviaContext = () => {
    return useContext(DeckTriviaContext)
}

const MAX_DECKLIST = 38768 // 23 August 2022

export const DeckTriviaProvider = ({ children }) => {
    const [cards, setCards] = useLocalStorage('cardList', STORED_CARD_20220508)
    const [deck, setDeck] = useState([])
    const [guest, setGuest] = useState()
    const [answer, setAnswer] = useState()
    const [charts, setCharts] = useState([
        { xAxis: 'cost', title: 'cost' },
        { xAxis: 'typeCode', title: 'typeCode' },
        { xAxis: 'slot', title: 'slot' },
        { xAxis: 'skillIntellect', title: 'intellect' },
        { xAxis: 'skillWillpower', title: 'willpower' },
        { xAxis: 'skillWild', title: 'wild' },
        { xAxis: 'skillCombat', title: 'combat' },
        { xAxis: 'skillAgility', title: 'Agility' },
    ])
    const [deckId, setDeckId] = useState(randomNumber(0, MAX_DECKLIST))
    const [refresh, toggleRefresh] = useToggle(false)
    const { getCardByCode } = useCardsContext()
    const [getData, { data, loading, refetch }] = useLazyAxios(`https://arkhamdb.com/api/public/decklist/${deckId}.json`)

    useEffect(() => {
        if (!loading) {
            toggleRefresh(false)
        }

        let slots = data?.slots
        if (slots) {
            setDeck({
                ...data,
                list: Object.keys(slots).map(key => {
                    return {
                        ...getCardByCode(key),
                        qtyInDeck: slots[key]
                    }
                })
            })
        }
    }, [data, loading])

    const getNewDeck = () => {
        setDeckId(randomNumber(0, MAX_DECKLIST))
    }

    useEffect(() => {
        if (deckId) { getData() }
    }, [deckId])

    const showAnswer = () => {
        setAnswer({
            name: data.investigator_name,
            url: 'https://arkhamdb.com/decklist/view/' + deckId,
            deckName: data.name
        })
    }

    return (
        <DeckTriviaContext.Provider
            value={{
                setGuest,
                showAnswer,
                answer,
                getNewDeck,
                deck,
                charts
            }}
        >
            {children}
        </DeckTriviaContext.Provider>
    )
}
