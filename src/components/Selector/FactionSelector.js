import { ButtonGroup, Button, Image, ToggleButton } from "react-bootstrap"
import { useCardsContext } from "../../contexts/CardsContext"
import { FACTION_LIST } from "../../constants/cardConstants"
import { useState } from "react"

export default function FactionSelector() {
    const { setFilter, filter } = useCardsContext()

    const onSelect = (faction) => {
        setFilter(prev => ({
            ...prev,
            factionCode: (faction.factionName == 'All') ? undefined : { term: faction.factionCode, operation: 'eq' },
        }))
    }

    return (<ButtonGroup className="py-2 d-flex ">
        {FACTION_LIST.map(faction =>
            <ToggleButton
                key={`factionFilter-${faction.factionCode}`}
                className='flex-fill'
                variant="outline-secondary"
                size='sm'
                type="checkbox"
                checked={filter.factionCode?.term == faction.factionCode}
                onClick={() => onSelect(faction)}
            >
                <Image style={{ width: '2em' }} src={faction.img} /><span className='px-2'>{faction.factionName}</span>
            </ToggleButton>
        )}
    </ButtonGroup>)
}