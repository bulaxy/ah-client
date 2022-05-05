import React, { useContext, useState } from "react"
import { camelStringToSpace } from '../helpers/general'
import { useCardsContext } from './CardsContext'
import { FILTERABLE_KEY_OPTIONS } from '../constants/cardConstants'

const CardsSearchContext = React.createContext()

export const useCardsSearchContext = () => {
    return useContext(CardsSearchContext)
}

export const CardsSearchProvider = ({ children }) => {
    const [searchFilter, setSearchFilter] = useState([])
    const [viewType, setViewType] = useState()
    const [filterOptions, setFilterOptions] = useState(FILTERABLE_KEY_OPTIONS.filter(o => o.type).map(o => ({ ...o, active: 1, label: camelStringToSpace(o.label) })))
    const { setFilter } = useCardsContext()
    const addFilter = (keyObject) => {
        setSearchFilter(prev => [...prev, keyObject])
        setFilterOptions(filterOptions.map(obj => obj.value == keyObject.value ? { ...obj, active: 0 } : obj))
    }

    const clearFilter = () => {
        setFilter({})
        setSearchFilter([])
        setFilterOptions(FILTERABLE_KEY_OPTIONS.filter(o => o.type).map(o => ({ ...o, active: 1 })))
    }

    const removeFilter = (keyObject) => {
        setSearchFilter(prev => prev.filter(({ value }) => keyObject.value !== value))
        setFilter(prev => ({ ...prev, [keyObject.value]: undefined }))
        setFilterOptions(filterOptions.map(obj => obj.value == keyObject.value ? { ...obj, active: 1 } : obj))
    }

    return (
        <CardsSearchContext.Provider
            value={{
                filterOptions: filterOptions.filter(o => o.active),
                searchFilter,
                setSearchFilter,
                viewType,
                setViewType,
                addFilter,
                clearFilter,
                removeFilter,
            }}
        >
            {children}
        </CardsSearchContext.Provider>
    )
}