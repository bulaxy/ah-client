import { useEffect, useMemo, useState } from "react"
import { Dropdown, DropdownButton, FormControl, Image, InputGroup } from "react-bootstrap"
import { useCardsContext } from "../../contexts/CardsContext"
import { DAMAGE, HORROR, RESOURCE } from '../../constants/imageConstants'
import { ArkhamFonts } from '../General/AHTextReplacer'
import { getCardKey } from '../../helpers/cardHelper'
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
    }
}

export function SymbolText(text) {
    switch (text) {
        case 'eq':
            return <>=</>
        case 'lt':
            return <>&lt;</>
        case 'gt':
            return <>&gt;</>
        case 'le':
            return <>&le;</>
        case 'ge':
            return <>&ge;</>
        case 'ne':
            return <>&ne;</>
    }
}

function OperatorDropdown({ operator, setOperator }) {
    return <DropdownButton
        variant="outline-secondary"
        title={SymbolText(operator)}
        onSelect={setOperator}
    >
        <Dropdown.Item className='text-center' eventKey={'eq'} href="#">=</Dropdown.Item>
        <Dropdown.Item className='text-center' eventKey={'lt'} href="#">&lt;</Dropdown.Item>
        <Dropdown.Item className='text-center' eventKey={'gt'} href="#">&gt;</Dropdown.Item>
        <Dropdown.Item className='text-center' eventKey={'ge'} href="#">&ge;</Dropdown.Item>
        <Dropdown.Item className='text-center' eventKey={'le'} href="#">&le;</Dropdown.Item>
        <Dropdown.Item className='text-center' eventKey={'ne'} href="#">&ne;</Dropdown.Item>
    </DropdownButton>
}

function IconField({ type }) {
    const { filter, setFilter, getFilterValue } = useCardsContext()
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

export default function IconSelector({ type = [] }) {

    return (
        <InputGroup>
            {type.map(t => (
                <IconField type={t} />
            ))}

        </InputGroup>
    )
}