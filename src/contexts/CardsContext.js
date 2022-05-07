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
    const { data, error, loading } = useAxios('http://localhost:8000/api/arkhamcardlist', 'GET', {}, [cards === null || cards.length == 0 ? true : false])

    useEffect(() => {
        if (data) {
            setCards(objectKeyToCamelCase(data.data))
        }
    }, [data])

    // console.log(cards, [...new Set(cards.map(obj => Object.keys(obj).map(key => JSON.stringify({ key, type: typeof obj[key] }))).flat())].map(json => JSON.parse(json)))

    const getCardByCode = useCallback((code) => {
        return cards.find(card => card.code === code)
    }, [cards])

    return (
        <CardsContext.Provider
            value={{
                cards,
                getCardByCode,
            }}
        >
            {children}
        </CardsContext.Provider>
    )
}
