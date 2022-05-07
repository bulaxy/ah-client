import React, { useState } from 'react'
import { useCardsSearchContext } from "../../contexts/CardsSearchContext"
import { FILTERABLE_KEY_OPTIONS } from '../../constants/cardConstants'
import FactionSelector from './selectors/FactionSelector'
import Select from 'react-select'
import { Button, InputGroup } from 'react-bootstrap'
import FilterRow from './FilterRow'
import { useCustomFilter } from '../../hooks/useCustomFilter'

export default function CustomSearchFilter({ filter, setFilter }) {
    const customFilter = useCustomFilter(setFilter)
    console.log(filter)
    return (
        <>
            <FactionSelector filter={filter} setFilter={setFilter} />
            <div className='mb-2'>
                {customFilter.searchFilter.map(o => (
                    <FilterRow key={'filterRow' - o} filterKey={o} filterOptions={{ ...customFilter, filter, setFilter }} />
                ))}
            </div>
            <InputGroup>
                <div className="react-select form-control p-0">
                    <Select placeholder='Add Filter' options={customFilter.filterOptions} value={''} onChange={customFilter.addFilter} />
                </div>
                <Button onClick={customFilter.clearFilter} className='btn-danger'>Clear All Filter</Button>
            </InputGroup>
        </>
    )
}
