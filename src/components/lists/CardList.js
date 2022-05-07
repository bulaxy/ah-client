import { useEffect, useState } from "react"
import { Card, Col, Fade, ListGroup, Row, Spinner, Table } from "react-bootstrap"
import { useEventListener } from '../../hooks/useEventListener'
import { FactionIcons } from '../../components/general/CommonImages'
import { useToggle } from "../../hooks/useToggle"
import CardModal from "../modals/CardModal"

export default function CardList({ cards = [] }) {
    const [loadedCards, setLoadedCards] = useState([])
    const [page, setPage] = useState(0)
    const [viewType, setViewType] = useState('table')
    const [cardCode, setCardCode] = useState(-1)

    const onScroll = () => {
        let isAtBottom = document.documentElement.scrollHeight - document.documentElement.scrollTop <= document.documentElement.clientHeight + 50
        if (!isAtBottom) return
        setPage(page + 1)
        setTimeout(() => {
            setLoadedCards(cards.slice(0, 20 * (1 + page)))
        }, 200)
    }
    useEventListener('scroll', onScroll)

    useEffect(() => {
        setPage(0)
        setLoadedCards(cards.slice(0, 50))
    }, [cards])

    const setModalOpen = (boo) => {
        if (boo) return
        setCardCode(-1)
    }

    if (viewType === 'table')
        return (
            <>
                <CardModal code={cardCode} open={cardCode !== -1} setOpen={setModalOpen} />
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Class/Type</th>
                            <th>Cost</th>
                            <th>Type</th>
                            <th>Traits</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loadedCards.map(card => (
                            <Fade key={'Animation-' + card.code} appear={true} in={true}>
                                <tr key={card.code} onClick={() => setCardCode(card.code)} className={`bg-${card.factionCode == 'neutral' ? 'light' : card.factionCode}`}>
                                    <td>{card.name} {card.xp > 0 && <>({card.xp})</>}</td>
                                    <td>
                                        {FactionIcons[card.factionCode]?.({ className: 'mx-2 ', style: { width: '1.25em' } })}
                                        {card.factionName}
                                    </td>
                                    <td>{card.cost}</td>
                                    <td>{card.typeName}</td>
                                    <td>{card.traits}</td>
                                </tr>
                            </Fade>
                        ))}
                        {loadedCards.length < cards.length && <tr >
                            <td colSpan={999} className="text-center">
                                <Spinner animation="border" />
                            </td>
                        </tr>}
                    </tbody>
                </Table>
            </>
        )
    return (
        <Row xs={3} md={4} className="g-4" >
            {/* {loadedCards
                    .sort((a, b) => a.realName.replace(/[^a-zA-Z0-9 ]/g, '') > b.realName.replace(/[^a-zA-Z0-9 ]/g, ''))
                    .map((card, idx) => (
                        <Col key={card.code}>
                        <Card>
                        <Card.Header>{card.name}</Card.Header>
                        <Card.Img style={{}} variant="top" src={`https://arkhamdb.com/${card.imagesrc}`} />
                        </Card>
                        </Col>
                    ))} 
                    */}

        </Row >
    )
}