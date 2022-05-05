import { Modal, Button, Image, ListGroup, Container, Col, Row, Accordion } from "react-bootstrap";
import { useToggle } from '../../..//hooks/useToggle'
import { useCardsContext } from "../../..//contexts/CardsContext"
import CardFlipper from "../../general/CardFlipper"

export default function InvestigatorDetailModal(props) {
    const { trigger, code } = props
    const [show, toggleShow] = useToggle(false)
    const { getCardByCode } = useCardsContext()
    const card = getCardByCode(code)
    return (<>
        <div onClick={toggleShow}>
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
                        <Accordion.Item eventKey={1}>
                            <Accordion.Header>Signatures</Accordion.Header>
                            <Accordion.Body>
                                <Container>
                                    <Row>
                                        {Object.keys(card['deckRequirements']?.card).map(signature => <Col><CardFlipper code={signature} /></Col>)}
                                    </Row>
                                </Container>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey={2}>
                            <Accordion.Header>List Keys</Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>
                                    {Object.keys(card).map(key =>
                                        <ListGroup.Item key={card.code + key} className="d-flex justify-content-between align-items-start" >
                                            <div>{key}</div>
                                            <div>{JSON.stringify(card?.[key])}</div>
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
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