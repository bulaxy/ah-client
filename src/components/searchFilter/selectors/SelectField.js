import { useEffect, useRef, useState } from "react"
import { Dropdown, DropdownButton, FormControl, Image, InputGroup } from "react-bootstrap"
import Select from "react-select"
import { useCardsContext } from "../../../contexts/CardsContext"
import { useCardsFilterDropdownOption } from '../../../hooks/useCardsFilterDropdownOption'

export default function SelectField({ type = {}, filter, setFilter }) {
    const [operator, setOperator] = useState(filter[type]?.operation || 'includes')
    const [value, setValue] = useState(filter[type]?.term)
    const options = useCardsFilterDropdownOption(type.value, type.splitter)
    const inputRef = useRef(null)

    useEffect(() => {
        setFilter(prev => ({
            ...prev,
            [type.value]: value === "" || typeof value == 'undefined' ? undefined : { term: value, operation: operator },
        }))
    }, [operator, value])

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    return <>
        <InputGroup.Text>
            {type.label}
        </InputGroup.Text>
        {/* <OperatorDropdown {...{ operator, setOperator }} /> */}
        <div className="react-select form-control p-0">
            <Select ref={inputRef} options={options} isMulti onChange={(arrObj) => setValue(arrObj.map(o => o.value))} />
        </div>
    </>
}
