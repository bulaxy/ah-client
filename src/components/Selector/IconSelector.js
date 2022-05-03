import { Dropdown, DropdownButton, FormControl, Image, InputGroup } from "react-bootstrap"
import { useCardsContext } from "../../contexts/CardsContext"
import { DAMAGE, HORROR, RESOURCE } from '../../constants/imageConstants'
import { useMemo } from "react"

export default function IconSelector({ type = 'damage' }) {
    const { setFilter, filter } = useCardsContext()

    const imgSrc = useMemo(() => {
        switch (type) {
            case 'horror':
                return HORROR
            case 'damage':
                return DAMAGE
            case 'resource':
                return RESOURCE
            case 'willpower':
                return
            case 'combat':
                return
            case 'intellect':
                return
            case 'agility':
                return
            case 'wild':
                return
        }
    }, [type])

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
                    <Image style={{ height: '1.5em' }} src={imgSrc} />
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