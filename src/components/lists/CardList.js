import { useEffect, useState } from "react"
import { Card, Col, Row } from "react-bootstrap"
import { useCardsContext } from "../../contexts/CardsContext"
import InvestigatorDetailModal from "../modals/CardDetailModal/InvestigatorDetailModal"

export default function InvestigatorListPage() {
    const { filteredCards } = useCardsContext()
    const [loadedCards, setLoadedCards] = useState([])
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        setPage(0)
        setLoadedCards(filteredCards.slice(0, 50))
    }, [filteredCards])

    const loadFunc = () => {
        console.warn(123, hasMore)
        // setLoadedCards([...loadedCards, ...filteredCards.slice(page * 50, (page + 1) * 50)])
        // setPage(page + 1)
        // setHasMore(filteredCards.length > loadedCards.length)
    }
    return (
        <Row xs={3} md={4} className="g-4">
            {loadedCards
                .sort((a, b) => a.realName.replace(/[^a-zA-Z0-9 ]/g, '') > b.realName.replace(/[^a-zA-Z0-9 ]/g, ''))
                .map((card, idx) => (
                    <Col key={card.code}>
                        <InvestigatorDetailModal code={card.code} trigger={
                            <Card>
                                <Card.Header>{card.name}</Card.Header>
                                <Card.Img style={{}} variant="top" src={`https://arkhamdb.com/${card.imagesrc}`} />
                            </Card>
                        } />
                    </Col>
                ))}
        </Row>
    )
}