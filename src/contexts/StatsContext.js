import React, { useContext, useEffect, useMemo, useState, useCallback } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { useAxios, useLazyAxios } from "use-axios-client"
import { objectKeyToCamelCase, capitalize } from "../helpers/general"
import { STORED_CARD_20220508, TEST_DECK } from '../constants/cardConstants'
import { useToggle } from "../hooks/useToggle"
import { useCardsContext } from "./CardsContext"
import axios from "axios"
const StatsContext = React.createContext()

export const useStatsContext = () => {
    return useContext(StatsContext)
}


export const StatsProvider = ({ children }) => {
    const [cards, setCards] = useLocalStorage('cardList', STORED_CARD_20220508)
    const [deck, setDeck] = useState([])
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
    const [url, setUrl] = useState('')
    const [refresh, toggleRefresh] = useToggle(false)
    const { getCardByCode } = useCardsContext()
    const [getData, { data, loading, refetch }] = useLazyAxios(`https://arkhamdb.com/api/public/deck/${url}.json`)

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

    const addChart = (type) => {
        setCharts(prev => [...prev, { type }])
    }

    const removeChart = (id) => {
        setCharts(prev => prev.filter((charts) => charts.id !== id))
    }

    const updateUrl = (inputValue) => {
        // sanitizeUrl
        let matches = inputValue.split('/').find(string => string?.match(/^[0-9]{5,8}/)?.length)
        if (!matches) return alert('Invalid Url')
        setUrl(matches)
    }

    useEffect(() => {
        if (url) {
            getData()
        }
    }, [url])

    return (
        <StatsContext.Provider
            value={{
                addChart,
                removeChart,
                refetch,
                updateUrl,
                deck,
                charts
            }}
        >
            {children}
        </StatsContext.Provider>
    )
}
