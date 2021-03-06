import { useEffect, useMemo, useState } from "react"
import { Dropdown, DropdownButton, FormControl, Image, InputGroup } from "react-bootstrap"
import { useCardsContext } from "../../../contexts/CardsContext"
import { DAMAGE, HORROR, RESOURCE } from '../../../constants/imageConstants'
import { ArkhamFonts } from '../../general/AHTextReplacer'
import { getCardKey } from '../../../helpers/cardHelper'
import OperatorDropdown from '../../general/OperationDropdown'

export function FilterIcons({ type }) {
    switch (type) {
        case 'horror':
            return <Image style={{ height: '1.5em' }} src={HORROR} />
        case 'damage':
            return <Image style={{ height: '1.5em' }} src={DAMAGE} />
        case 'resource':
            return <Image style={{ height: '1.5em' }} src={RESOURCE} />
        case 'willpower':
            return <ArkhamFonts text={'willpower'} />
        case 'combat':
            return <ArkhamFonts text={'combat'} />
        case 'intellect':
            return <ArkhamFonts text={'intellect'} />
        case 'agility':
            return <ArkhamFonts text={'agility'} />
        case 'wild':
            return <ArkhamFonts text={'wild'} />
        default:
            return <span>{type}</span>
    }
}

export function IconField({ type, filter, setFilter }) {
    const [operator, setOperator] = useState(filter[getCardKey(type)]?.operation || 'eq')
    const [value, setValue] = useState(filter[getCardKey(type)]?.term)

    useEffect(() => {
        setFilter(prev => ({
            ...prev,
            [getCardKey(type)]: value === "" || typeof value == 'undefined' ? undefined : { term: Number(value), operation: operator },
        }))
    }, [operator, value])

    return <>
        <InputGroup.Text>
            <FilterIcons type={type} />
        </InputGroup.Text>
        <OperatorDropdown operator={operator} setOperator={setOperator} />
        <FormControl onChange={(e) => setValue(e.target.value)} value={value} />
    </>
}

export default function IconSelector({ type = [], filter = {}, setFilter = () => { } }) {
    return (
        <InputGroup>
            {type.map(t => (
                <IconField type={t} filter={filter} setFilter={setFilter} />
            ))}
        </InputGroup>
    )
}