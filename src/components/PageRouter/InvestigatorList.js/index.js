import { useEffect } from "react"
import { Card, Col, Row, Button } from "react-bootstrap"
import { useCardsContext } from "../../../contexts/CardsContext"
import InvestigatorDetailModal from "../../Modal/CardDetailModal/InvestigatorDetailModal"

export default function InvestigatorList() {
    const { filteredCards, setFilter } = useCardsContext()
    useEffect(() => {
        setFilter({
            typeCode: { term: 'investigator', operation: 'eq' },
            hidden: { term: 1, operation: 'ne' }
        })
    }, [])

    return (
        <>
            <div>InvestigatorList</div>
            <Row xs={3} md={4} className="g-4">
                {filteredCards
                    .sort((a, b) => a.realName.replace(/[^a-zA-Z0-9 ]/g, '') > b.realName.replace(/[^a-zA-Z0-9 ]/g, ''))
                    .map((card, idx) => (
                        <Col key={card.code}>
                            <InvestigatorDetailModal code={card.code} trigger={
                                <Card>
                                    <Card.Header>{card.name}</Card.Header>
                                    <Card.Img style={{}} variant="top" src={`https://arkhamdb.com/${card.imagesrc}`} />
                                    {/* <Card.Body>
                                <Card.Text>
                                    This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.
                                </Card.Text>
                            </Card.Body> */}
                                </Card>
                            } />
                        </Col>
                    ))}
            </Row>
        </>
    )
}