import { useEffect, useMemo, useState } from "react"
import { Dropdown, DropdownButton, FormControl, Image, InputGroup } from "react-bootstrap"
import Select from "react-select"
import { useCardsContext } from "../../../contexts/CardsContext"
import { useCardFilterDropdownOption } from '../../../hooks/useCardFilterDropdownOption'
export default function SelectField({ type = {} }) {
    const { filter, setFilter, getFilterValue } = useCardsContext()
    const [operator, setOperator] = useState(filter[type]?.operation || 'includes')
    const [value, setValue] = useState(filter[type]?.term)
    const options = useCardFilterDropdownOption(type.value, type.splitter)
    useEffect(() => {
        setFilter(prev => ({
            ...prev,
            [type.value]: value === "" || typeof value == 'undefined' ? undefined : { term: value, operation: operator },
        }))
    }, [operator, value])

    return <>
        <InputGroup.Text>
            {type.label}
        </InputGroup.Text>
        {/* <OperatorDropdown {...{ operator, setOperator }} /> */}
        <div className="react-select form-control p-0">
            <Select options={options} isMulti onChange={({ value }) => setValue(value)} />
        </div>
    </>
}
