import React, { useContext, useEffect, useMemo, useState, useCallback } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { useAxios } from "../hooks/useAxios"
import { objectKeyToCamelCase, capitalize } from "../helpers/general"

const CardsContext = React.createContext()

export const useCardsContext = () => {
    return useContext(CardsContext)
}

export const CardsProvider = ({ children }) => {
    const [cards, setCards] = useLocalStorage('cardList', [])
    const [filter, setFilter] = useState({})
    const [filteredCards, setFilteredCards] = useState([])
    const { data, error, loading } = useAxios('http://localhost:8000/api/arkhamcardlist', 'GET', {}, [cards === null || cards.length == 0 ? true : false])

    useEffect(() => {
        if (data) {
            setCards(objectKeyToCamelCase(data.data))
        }
    }, [data])

    // console.log(cards, [...new Set(cards.map(obj => Object.keys(obj).map(key => JSON.stringify({ key, type: typeof obj[key] }))).flat())].map(json => JSON.parse(json)))
    console.log(filteredCards, filter)

    useEffect(() => {
        setFilteredCards(cards.filter(card => {
            let result = []
            // If no filter, dont over populate it
            if (Object.keys(filter).length === 0) return false

            Object.keys(filter).forEach(key => {
                if (typeof filter[key] === 'undefined') return
                switch (filter[key].operation) {
                    // Using shorten name like the way sharepoint is doing it.
                    case 'eq':
                        result.push(card[key] === filter[key].term)
                        break;
                    case 'lt':
                        result.push(card[key] < filter[key].term)
                        break;
                    case 'gt':
                        result.push(card[key] > filter[key].term)
                        break;
                    case 'le':
                        result.push(card[key] <= filter[key].term)
                        break;
                    case 'ge':
                        result.push(card[key] >= filter[key].term)
                        break;
                    case 'ne':
                        result.push((card[key] != filter[key].term))
                        break;
                    case 'includes':
                        result.push(card[key].includes(filter[key].term))
                        break
                    case 'notIncludes':
                        result.push(card[key].includes(filter[key].term))
                        break
                }
            })
            return result.indexOf(false) === -1
        }))
    }, [filter, cards])

    const getCardByCode = useCallback((code) => {
        return cards.find(card => card.code === code)
    }, [cards])

    const filterType = useMemo(() => Object.keys(filter), [filter])

    return (
        <CardsContext.Provider
            value={{
                cards,
                setFilter,
                filter,
                filteredCards,
                getCardByCode,
                filterType
            }}
        >
            {children}
        </CardsContext.Provider>
    )
}