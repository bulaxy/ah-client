import React, { useContext, useEffect } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { useAxios } from "../hooks/useAxios"
const CardsContext = React.createContext()

export const useCardsContext = () => {
    return useContext(CardsContext)
}

export const CardsProvider = ({ children }) => {
    const [items, setItems] = useLocalStorage('cardList', [])
    const [filter, setFilter] = useState({})
    const [filteredList, setFilteredList] = useState([])
    const { data, error, loading } = useAxios('http://localhost:8000/api/arkhamcardlist', 'GET', {}, [items === null || items.length == 0 ? true : false])

    useEffect(() => {
        if (data) {
            setItems(data.data)
        }
    }, [data])

    useEffect(() => {
        setFilteredList(items.filter(item => {
        }))
    }, [filter, items])

    return (
        <CardsContext.Provider
            value={{
                items,
                setFilter,
                filteredList
            }}
        >
            {items?.data?.length}
            {children}
        </CardsContext.Provider>
    )
}