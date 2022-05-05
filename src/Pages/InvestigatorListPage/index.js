import { useEffect } from "react"
import { useCardsContext } from "../../contexts/CardsContext"
import InvestigatorList from "../../components/lists/InvestigatorList"
import FactionSelector from "../../components/searchFilter/selectors/FactionSelector"
import IconSelector from "../../components/searchFilter/selectors/IconSelector"
import { Container } from "react-bootstrap"

export default function InvestigatorListPage() {
    const { setFilter } = useCardsContext()
    useEffect(() => {
        setFilter(prev => ({
            ...prev,
            typeCode: { term: 'investigator', operation: 'eq' },
            hidden: { term: 1, operation: 'ne' }
        }))
    }, [])

    return (
        <Container>
            <FactionSelector />
            <div className='mb-1'>
                <IconSelector type={['damage', 'horror']} />
            </div>
            <div className='mb-3'>
                <IconSelector type={['willpower', 'combat', 'intellect', 'agility',]} />
            </div>
            <InvestigatorList />
        </Container>
    )
}