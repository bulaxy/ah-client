import React, { useContext, useEffect, useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { useAxios } from "../hooks/useAxios"
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
            setCards(data.data)
        }
    }, [data])

    useEffect(() => {
        setFilteredCards(cards.filter(card => {
            let result = []
            Object.keys(filter).forEach(key => {
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
    //let uniqueKeys = Object.keys(Object.assign({}, ...cards));
    console.log(filter, filteredCards)
    return (
        <CardsContext.Provider
            value={{
                cards,
                setFilter,
                filteredCards
            }}
        >
            {cards?.data?.length}
            {children}
        </CardsContext.Provider>
    )
}