import React, { useState } from 'react'
import { useCardsSearchContext } from "../../contexts/CardsSearchContext"
import { FILTERABLE_KEY_OPTIONS } from '../../constants/cardConstants'
import FactionSelector from './selectors/FactionSelector'
import Select from 'react-select'
import { Button, InputGroup } from 'react-bootstrap'
import FilterRow from './FilterRow'
const customStyles = {
    control: () => ({
        // none of react-select's styles are passed to <Control />
        width: 200,
    })
}
export default function CustomSearchFilter() {
    const { filterOptions, addFilter, clearFilter, searchFilter, removeFilter, viewType, setViewType } = useCardsSearchContext()

    return (
        <>
            <FactionSelector />
            <div style={{ maxHeight: 200 }} className='overflow-auto mb-2'>
                {searchFilter.map(o => <FilterRow filterKey={o} />)}
            </div>
            <InputGroup>
                <div className="react-select form-control p-0">
                    <Select placeholder='Add Filter' options={filterOptions} value={''} onChange={addFilter} />
                </div>
                <Button onClick={clearFilter} className='btn-danger'>Clear All Filter</Button>
            </InputGroup>
        </>
    )
}
