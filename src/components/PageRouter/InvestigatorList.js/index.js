import { useEffect } from "react"
import { Card, Col, Row } from "react-bootstrap"
import { useCardsContext } from "../../../contexts/CardsContext"

export default function InvestigatorList() {
    const { filteredCards, setFilter } = useCardsContext()
    useEffect(() => {
        setFilter({
            type_code: { term: 'investigator', operation: 'eq' },
            hidden: { term: 1, operation: 'ne' }
        })
    }, [])

    return (
        <>
            <div>InvestigatorList</div>

            <Row xs={1} md={2} className="g-4">
                {filteredCards
                    .sort((a, b) => a.real_name.replace(/[^a-zA-Z0-9 ]/g, '') > b.real_name.replace(/[^a-zA-Z0-9 ]/g, ''))
                    .map((card, idx) => (
                        <Col key={card.col}>
                            <Card>
                                <Card.Header>{card.name}</Card.Header>
                                <Card.Img variant="top" src={`https://arkhamdb.com/${card.imagesrc}`} />
                                {/* <Card.Body>
                                <Card.Text>
                                    This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.
                                </Card.Text>
                            </Card.Body> */}
                            </Card>
                        </Col>
                    ))}
            </Row>
        </>
    )
}