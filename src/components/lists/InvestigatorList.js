import { useEffect } from "react"
import { Card, Col, Row, Button, InputGroup, FormControl, Dropdown, DropdownButton } from "react-bootstrap"
import { useCardsContext } from "../../contexts/CardsContext"
import InvestigatorDetailModal from "../modals/CardDetailModal/InvestigatorDetailModal"
import { FactionIcons } from '../../components/general/CommonImages'

export default function InvestigatorList({ cards = [] }) {
    return (
        <Row xs={3} md={4} className="g-4">
            {cards
                .sort((a, b) => a.realName.replace(/[^a-zA-Z0-9 ]/g, '') > b.realName.replace(/[^a-zA-Z0-9 ]/g, ''))
                .map((card, idx) => (
                    <Col key={card.code}>
                        <InvestigatorDetailModal code={card.code} trigger={
                            <Card>
                                <Card.Header className={`p-1  bg-${card.factionCode == 'neutral' ? 'light' : card.factionCode}`}>
                                    {FactionIcons[card.factionCode]({ className: 'mx-2 ', style: { width: '1.25em' } })}
                                    <span className='font-weight-bold '>{card.name}</span>
                                </Card.Header>
                                <Card.Img style={{}} variant="top" src={`https://arkhamdb.com/${card.imagesrc}`} />
                            </Card>
                        } />
                    </Col>
                ))}
        </Row>
    )
}