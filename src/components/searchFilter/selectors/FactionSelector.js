import { ButtonGroup, Button, Image, ToggleButton } from "react-bootstrap"
import { FACTION_LIST } from "../../../constants/cardConstants"

export default function FactionSelector({ filter = {}, setFilter = () => { } }) {

    const onSelect = (faction) => {
        setFilter(prev => ({
            ...prev,
            factionCode: (faction.factionName == 'All') ? undefined : { term: faction.factionCode, operation: 'eq' },
        }))
    }
    // Tab Index being -1 so it will skip over when tabbing
    // Using checkbox Button to select faction
    return (<ButtonGroup className="py-2 d-flex ">

        {FACTION_LIST.map(faction =>
            <ToggleButton
                key={`factionFilter-${faction.factionCode}`}
                className='flex-fill'
                variant="outline-secondary"
                size='sm'
                type="checkbox"
                tabIndex='-1'
                checked={filter.factionCode?.term == faction.factionCode}
                onClick={() => onSelect(faction)}
            >
                <Image style={{ width: '2em' }} src={faction.img} /><span className='px-2'>{faction.factionName}</span>
            </ToggleButton>
        )}
    </ButtonGroup>)
}