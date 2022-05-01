import { useState } from "react";
import { Modal, Button, Image, ListGroup, Container, Col, Row, Accordion, ModalHeader } from "react-bootstrap";
import { ChaosBagProvider } from '../../../contexts/ChaosBagContext'
import { useToggle } from "../../../hooks/useToggle"
import BagSetup from "./BagSetup"
import BagModifierUpdate from "./BagModifierUpdate"
import BagStats from "./BagStats"

export default function ChaosBagStatsModal(props) {
    const { trigger } = props
    const [show, toggleShow] = useToggle(true)

    return (<>
        <div onClick={toggleShow}>
            {{ ...trigger }}
        </div>
        {show &&
            <Modal show={show} onHide={toggleShow} size={'lg'}>
                <ModalHeader>
                    Chaos Bag Setup
                </ModalHeader>
                <Modal.Body>
                    <ChaosBagProvider>
                        <Accordion defaultActiveKey="setup">
                            <Accordion.Item eventKey="setup">
                                <BagSetup />
                            </Accordion.Item>
                            <Accordion.Item eventKey="update">
                                <BagModifierUpdate />
                            </Accordion.Item>
                            <Accordion.Item eventKey="stats">
                                <BagStats />
                            </Accordion.Item>
                        </Accordion>
                    </ChaosBagProvider>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleShow}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        }
    </>
    );
}