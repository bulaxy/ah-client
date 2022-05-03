import React, { useContext, useEffect, useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { useAxios } from "../hooks/useAxios"
import { toCamelCase } from "../helpers/general"

const CardsContext = React.createContext()

export const useCardsContext = () => {
    return useContext(CardsContext)
}

export const CardsProvider = ({ children }) => {
    const [cards, setCards] = useLocalStorage('cardList', [])
    const [trails, setTrails] = useLocalStorage('cardTrails', [])
    const [filter, setFilter] = useState({})
    const [filteredCards, setFilteredCards] = useState([])
    const { data, error, loading } = useAxios('http://localhost:8000/api/arkhamcardlist', 'GET', {}, [cards === null || cards.length == 0 ? true : false])

    useEffect(() => {
        if (data) {
            setCards(toCamelCase(data.data))
            // Get Unique Trails by using Set, split by "." and trimming the white spaces
            setTrails(
                [...new Set(toCamelCase(data.data)
                    .map(o => o
                        ?.traits
                        ?.split('.')
                        ?.map(o => o.trim()))
                    .flat())
                ].filter(o => !(o === '' || typeof o === 'undefined'))
            )
        }
    }, [data])

    console.log(cards, [...new Set(toCamelCase(cards)
        .map(o => o?.factionCode)
        .flat())
    ].filter(o => !(o === '' || typeof o === 'undefined'))
    )
    useEffect(() => {
        console.log('*', filter)
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
                }
            })
            return result.indexOf(false) === -1
        }))
    }, [filter, cards])

    const getCardByCode = (code) => {
        return cards.find(card => card.code === code)
    }

    return (
        <CardsContext.Provider
            value={{
                cards,
                setFilter,
                filter,
                filteredCards,
                getCardByCode
            }}
        >
            {cards?.data?.length}
            {children}
        </CardsContext.Provider>
    )
}