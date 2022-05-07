import { useEffect, useMemo, useState } from "react"
import { Dropdown, DropdownButton, FormControl, Image, InputGroup } from "react-bootstrap"
import { useCardsContext } from "../../../contexts/CardsContext"
import OperatorDropdown from '../../general/OperationDropdown'
import { getCardKey } from '../../../helpers/cardHelper'

export default function NumberField({ type = {}, filter, setFilter }) {
    const [operator, setOperator] = useState(filter[type]?.operation || 'eq')
    const [value, setValue] = useState(filter[type]?.term)

    useEffect(() => {
        setFilter(prev => ({
            ...prev,
            [type.value]: value === "" || typeof value == 'undefined' ? undefined : { term: Number(value), operation: operator },
        }))
    }, [operator, value])

    return <>
        <InputGroup.Text>
            {type.label}
        </InputGroup.Text>
        <OperatorDropdown {...{ operator, setOperator, type: 'number' }} />
        <FormControl onChange={(e) => setValue(e.target.value)} value={value} />
    </>
}
