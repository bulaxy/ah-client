import { useEffect, useRef, useState } from "react"
import { Dropdown, DropdownButton, FormControl, Image, InputGroup } from "react-bootstrap"
import { useCardsContext } from "../../../contexts/CardsContext"
import OperationDropdown from '../../general/OperationDropdown'

export default function TextField({ type = {}, filter, setFilter }) {
    const [operator, setOperator] = useState(filter[type]?.operation || 'includes')
    const [value, setValue] = useState(filter[type]?.term)
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
        <OperationDropdown {...{ operator, setOperator, type: 'string' }} />
        <FormControl ref={inputRef} onChange={(e) => setValue(e.target.value)} value={value} />
    </>
}
