import React, { useContext, useEffect } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { useAxios } from "../hooks/useAxios"
const CardsContext = React.createContext()

export const useSiteSettingContext = () => {
    return useContext(CardsContext)
}

export const CardsProvider = ({ children }) => {
    const [items, setItems] = useLocalStorage('cardList', [])
    //const { data, error, loading } = useAxios('https://arkhamdb.com/api/public/cards', 'GET', {}, [items?.length == 0 ? false : true])
    const { data, error, loading } = useAxios('https://localhost:8000/api/arkhamcards', 'GET', {}, [])
    useEffect(() => setItems(data), data)

    console.log(items)
    if (loading) {
        return <></>
    }
    return (
        <CardsContext.Provider
            value={{
                items
            }}
        >
            {children}
        </CardsContext.Provider>
    )
}