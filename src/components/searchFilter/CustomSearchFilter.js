import React, { useEffect, useState } from 'react'
import FactionSelector from './selectors/FactionSelector'
import Select from 'react-select'
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import FilterRow from './FilterRow'
import { useCustomFilter } from '../../hooks/useCustomFilter'
import { useToggle } from '../../hooks/useToggle'

export default function CustomSearchFilter({ filter, setFilter }) {
    const customFilter = useCustomFilter(setFilter)
    const [siSearchMode, toggleSiSearchMode] = useToggle(false)

    useEffect(() => {
        if (!siSearchMode) return
        customFilter.clearFilter()
    }, [siSearchMode])

    return (
        <>
            {!siSearchMode && <>
                <FactionSelector filter={filter} setFilter={setFilter} />
                <div className='mb-2'>
                    {customFilter.searchFilter.map(o => (
                        <FilterRow key={'filterRow-' + o.value} filterKey={o} filterOptions={{ ...customFilter, filter, setFilter }} />
                    ))}
                </div>
            </>}
            <InputGroup className={`${siSearchMode ? 'my-2' : 'mb-2'}`}>
                <Button onClick={toggleSiSearchMode} className='btn-primary'>Switch Search Mode</Button>
                {siSearchMode ?
                    <FormControl
                        placeholder="Search Terms"
                        aria-label="Search Terms"
                        onChange={(e) => setFilter(e.target.value)}
                    /> :
                    <>
                        <div className="react-select form-control p-0">
                            <Select placeholder='Add Filter' options={customFilter.filterOptions} value={''} onChange={customFilter.addFilter} />
                        </div>
                        <Button onClick={customFilter.clearFilter} className='btn-danger'>Clear All Filter</Button>
                    </>}
            </InputGroup>
        </>
    )
}
