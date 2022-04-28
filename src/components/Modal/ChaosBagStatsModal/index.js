import { useState } from "react";
import { Modal, Button, Image, ListGroup, Container, Col, Row, Accordion, ModalHeader } from "react-bootstrap";
import { useToggle } from "../../../hooks/useToggle"
import BagSetup from "./BagSetup"
import { ChaosBagProvider } from '../../../contexts/ChaosBagContext'

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
                        <BagSetup />
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