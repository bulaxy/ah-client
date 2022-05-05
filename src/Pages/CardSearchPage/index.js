
import CardSearchFilters from '../../components/searchFilter/CustomSearchFilter'
import CardsResult from '../../components/lists/CardList'
import { CardsSearchProvider } from '../../contexts/CardsSearchContext'
import { Container } from 'react-bootstrap'

export default function CardSearchPage() {

    return (
        <CardsSearchProvider>
            <Container >
                <CardSearchFilters />
                <CardsResult />
            </Container>
        </CardsSearchProvider>
    )
}