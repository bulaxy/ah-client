import { useEffect, useRef, useState } from "react";
import { Accordion, Container, Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { BsGearFill, BsBellFill } from "react-icons/bs"
import { useKeyPress } from "../../hooks/useKeyPress"
import { GiToken } from 'react-icons/gi'
import ChaosBagModal from '../Modal/ChaosBagStatsModal'
import { useToggle } from "../../hooks/useToggle";

export default function Header() {
    const { keyDown } = useKeyPress("/")
    const searchInput = useRef(null);
    const [focus, toggleFocus] = useToggle()
    const [searchText, setSearchText] = useState()

    useEffect(() => {
        // When "/" Keydown, focus onto that search bar 
        if (!keyDown) return
        setSearchText(searchText)
        searchInput.current.focus()
    }, [keyDown])

    // Only update when it if already focused, so that when "/" is press, it doesnt auto-enter "/" in
    const onChange = (e) => {
        if (!focus) return
        setSearchText(e.target.value)
    }
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
                        <Nav.Link href="cards">Cards Info</Nav.Link>
                    </Nav>
                    <ChaosBagModal
                        trigger={
                            <Button className="d-flex" variant="outline-info">
                                <GiToken size={'1.5em'} />
                            </Button>
                        }
                    />
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onFocus={toggleFocus}
                            ref={searchInput}
                            value={searchText}
                            onChange={onChange}
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}