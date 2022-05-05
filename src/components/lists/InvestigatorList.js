import { useEffect } from "react"
import { Card, Col, Row, Button, InputGroup, FormControl, Dropdown, DropdownButton } from "react-bootstrap"
import { useCardsContext } from "../../contexts/CardsContext"
// import InvestigatorDetailModal from "../../modals/CardDetailModal/InvestigatorDetailModal"

export default function InvestigatorList() {
    const { filteredCards } = useCardsContext()
    return (
        <Row xs={3} md={4} className="g-4">
            {filteredCards
                .sort((a, b) => a.realName.replace(/[^a-zA-Z0-9 ]/g, '') > b.realName.replace(/[^a-zA-Z0-9 ]/g, ''))
                .map((card, idx) => (
                    <Col key={card.code}>
                        {/* <InvestigatorDetailModal code={card.code} trigger={
                            <Card>
                                <Card.Header>{card.name}</Card.Header>
                                <Card.Img style={{}} variant="top" src={`https://arkhamdb.com/${card.imagesrc}`} />
                            </Card>
                        } /> */}
                    </Col>
                ))}
        </Row>
    )
}