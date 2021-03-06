
import CustomSearchFilter from '../../components/searchFilter/CustomSearchFilter'
import CardsResult from '../../components/lists/CardList'
import { Container } from 'react-bootstrap'
import { useState } from 'react'
import { useCardsFilter } from '../../hooks/useCardsFilter'

export default function CardSearchPage(props) {
    const [filter, setFilter] = useState({})
    const cards = useCardsFilter(filter)

    return (
        <Container >
            <CustomSearchFilter filter={filter} setFilter={setFilter} />
            <CardsResult cards={cards} />
        </Container>
    )
}