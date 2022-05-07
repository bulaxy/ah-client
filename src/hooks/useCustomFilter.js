import React, { useContext, useState } from "react"
import { camelStringToSpace } from '../helpers/general'
import { FILTERABLE_KEY_OPTIONS } from '../constants/cardConstants'

export const useCustomFilter = (setFilter) => {
    const [searchFilter, setSearchFilter] = useState([])
    const [filterOptions, setFilterOptions] = useState(FILTERABLE_KEY_OPTIONS.filter(o => o.type).map(o => ({ ...o, active: 1, label: camelStringToSpace(o.label) })))

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

    return {
        filterOptions: filterOptions.filter(o => o.active),
        searchFilter,
        setSearchFilter,
        addFilter,
        clearFilter,
        removeFilter,
    }
}