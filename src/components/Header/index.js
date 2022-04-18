import { useEffect, useRef } from "react";
import { Accordion, Container, Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { BsGearFill, BsBellFill } from "react-icons/bs"
import { useKeyPress } from "../../hooks/useKeyPress"

export default function Header() {
    const searchFocus = useKeyPress("/")
    const searchInput = useRef(null);

    useEffect(() => {
        if (searchFocus) {
            searchInput.current.focus()
        }
    }, [searchFocus])

    return (
        <Navbar bg="dark" variant="dark" >
            <Container fluid>
                <Navbar.Brand href="/">Navbar scroll</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="investigators">Deck Builder</Nav.Link>
                        <Nav.Link href="action2">Cards Info</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            ref={searchInput}
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}