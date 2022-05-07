import { useEffect, useRef, useState } from "react"
import { FormControl, Image, InputGroup } from "react-bootstrap"
import OperatorDropdown from '../../general/OperationDropdown'

export default function NumberField({ type = {}, filter, setFilter }) {
    const [operator, setOperator] = useState(filter[type]?.operation || 'eq')
    const [value, setValue] = useState(filter[type]?.term)
    const inputRef = useRef(null)

    useEffect(() => {
        setFilter(prev => ({
            ...prev,
            [type.value]: value === "" || typeof value == 'undefined' ? undefined : { term: Number(value), operation: operator },
        }))
    }, [operator, value])

    useEffect(() => {
        inputRef.current.focus()
    }, [])
    return <>
        <InputGroup.Text >
            {type.label}
        </InputGroup.Text>
        <OperatorDropdown {...{ operator, setOperator, type: 'number' }} />
        <FormControl ref={inputRef} onChange={(e) => setValue(e.target.value)} value={value} />
    </>
}
