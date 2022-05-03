import { Dropdown, DropdownButton, FormControl, Image, InputGroup } from "react-bootstrap"
import { useCardsContext } from "../../contexts/CardsContext"
import { DAMAGE, HORROR, RESOURCE } from '../../constants/imageConstants'
import { useMemo } from "react"
import { ArkhamFonts } from '../General/AHTextReplacer'

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

export default function IconSelector({ type }) {
    const { setFilter, filter } = useCardsContext()

    const onSelect = (faction) => {
        setFilter(prev => ({
            ...prev,
            factionCode: (faction.factionName == 'All') ? undefined : { term: faction.factionCode, operation: 'eq' },
        }))
    }

    return (
        <InputGroup className="mb-3">
            <DropdownButton
                variant="outline-secondary"
                title={<>
                    <FilterIcons type={type} />
                    <span className="fs-6"> =</span>
                </>}
                className='align-middle'
            >
                <Dropdown.Item href="#">=</Dropdown.Item>
                <Dropdown.Item href="#">&lt;</Dropdown.Item>
                <Dropdown.Item href="#">&gt;</Dropdown.Item>
                <Dropdown.Item href="#">&ge;</Dropdown.Item>
                <Dropdown.Item href="#">&le;</Dropdown.Item>
            </DropdownButton>
            <FormControl aria-label="Text input with dropdown button" />
        </InputGroup>
    )
}