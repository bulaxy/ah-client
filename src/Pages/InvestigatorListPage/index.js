import { useEffect, useState } from "react"
import InvestigatorList from "../../components/lists/InvestigatorList"
import FactionSelector from "../../components/searchFilter/selectors/FactionSelector"
import IconSelector from "../../components/searchFilter/selectors/IconSelector"
import { Container } from "react-bootstrap"
import { useCardsFilter } from "../../hooks/useCardsFilter"
import { INVESTIGATOR_FILTER } from "../../constants/cardConstants"

export default function InvestigatorListPage() {
    const [filter, setFilter] = useState(INVESTIGATOR_FILTER)
    const filteredCards = useCardsFilter(filter)

    return (
        <Container>
            <FactionSelector filter={filter} setFilter={setFilter} />
            <div className='mb-1'>
                <IconSelector type={['damage', 'horror']} filter={filter} setFilter={setFilter} />
            </div>
            <div className='mb-3'>
                <IconSelector type={['willpower', 'combat', 'intellect', 'agility',]} filter={filter} setFilter={setFilter} />
            </div>
            <InvestigatorList cards={filteredCards} />
        </Container>
    )
}