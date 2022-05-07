import { useEffect, useState } from "react";
import { Modal, Button, Image, ListGroup, Container, Col, Row, Accordion } from "react-bootstrap";
import { useCardsContext } from "../../../contexts/CardsContext"
import CardFlipper from "../../general/CardFlipper"

export default function CardModal(props) {
    const { trigger = <></>, triggerProps, code, open, setOpen = () => { } } = props
    const [show, setShow] = useState(false)
    const { getCardByCode } = useCardsContext()
    const card = getCardByCode(code)


    useEffect(() => {
        setShow(open)
    }, [open])

    const toggleShow = (value) => {
        setShow(value)
        setOpen(value)
    }

    if (typeof card == 'undefined') return

    return (<>
        <div onClick={toggleShow} {...triggerProps}>
            {{ ...trigger }}
        </div>
        {show &&
            <Modal show={show} onHide={toggleShow} size={'lg'}>
                <Modal.Body>
                    <CardFlipper code={card.code} />
                    <Accordion flush className={'mt-1'}>
                        <Accordion.Item eventKey={0}>
                            <Accordion.Header>Alternatives</Accordion.Header>
                            <Accordion.Body>
                                <Container>
                                    <Row>
                                        <Col>
                                            <CardFlipper code={card.code} />
                                        </Col>
                                    </Row>
                                </Container>
                            </Accordion.Body>
                        </Accordion.Item>
                        {card?.['deckRequirements']?.card &&
                            <Accordion.Item eventKey={1}>
                                <Accordion.Header>Signatures</Accordion.Header>
                                <Accordion.Body>
                                    <Container>
                                        <Row>
                                            {Object.keys(card?.['deckRequirements']?.card ?? {})?.map(signature => <Col><CardFlipper code={signature} /></Col>)}
                                        </Row>
                                    </Container>
                                </Accordion.Body>
                            </Accordion.Item>
                        }
                        <Accordion.Item eventKey={2}>
                            <Accordion.Header>List Keys</Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>
                                    {/* // TODO: Improve the list */}
                                    {Object.keys(card).map(key =>
                                        <ListGroup.Item key={card.code + key} className="d-flex justify-content-between align-items-start" >
                                            <div>{key}</div>
                                            <div>{JSON.stringify(card?.[key])}</div>
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey={3}>
                            <Accordion.Header>Restriction</Accordion.Header>
                            <Accordion.Body>
                                {Object.keys(card?.restrictions?.investigator ?? {})?.map(investigatorKey => <CardFlipper code={investigatorKey} />)}
                            </Accordion.Body>
                        </Accordion.Item>
                        {card.boundedCard &&
                            <Accordion.Item eventKey={4}>
                                <Accordion.Header>Bounded To</Accordion.Header>
                                <Accordion.Body>
                                    <Row>
                                        {card?.bondedCards?.map(card =>
                                            <Col>
                                                <CardFlipper code={card.code} />
                                            </Col>
                                        )}
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>
                        }
                        {card.linkedToCode &&
                            <Accordion.Item eventKey={4}>
                                <Accordion.Header>Linked To Card</Accordion.Header>
                                <Accordion.Body>
                                    <CardFlipper code={card.linkedToCode} />
                                </Accordion.Body>
                            </Accordion.Item>
                        }
                    </Accordion>
                    <a href={card.url}>Arkham DB Link</a>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleShow}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={toggleShow}>
                        More Detail
                    </Button>
                    <Button variant="primary" onClick={toggleShow}>
                        Select
                    </Button>
                </Modal.Footer>
            </Modal>
        }
    </>
    );
}