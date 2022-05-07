import { useEffect, useMemo, useRef, useState } from "react"
import { Dropdown, DropdownButton, FormControl, Image, InputGroup } from "react-bootstrap"
import OperatorDropdown from '../../general/OperationDropdown'
import Select from 'react-select'

export default function BooleanField({ type = {}, filter, setFilter }) {
    const [operator, setOperator] = useState(filter[type]?.operation || 'eq')
    const [value, setValue] = useState(filter[type]?.term ?? 1)
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
        <OperatorDropdown {...{ operator, setOperator, type: 'number' }} />
        <div className="react-select form-control p-0">
            <Select ref={inputRef} options={[{ value: true, label: 'True' }, { value: false, label: 'False' }]} onChange={(obj) => setValue(obj.value)} />
        </div>
    </>
}
