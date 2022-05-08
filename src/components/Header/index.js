import { useEffect, useRef, useState } from "react";
import { Container, Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { useKeyPress } from "../../hooks/useKeyPress"
import { GiToken } from 'react-icons/gi'
import ChaosBagModal from '../modals/ChaosBagStatsModal'
import { useNavigate } from "react-router-dom";

export default function Header() {
    const { keyDown, keyUp } = useKeyPress("/")
    const enterKeyPress = useKeyPress("Enter")
    const searchInput = useRef(null);
    const [focus, setFocus] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [keyHold, setKeyHold] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        // When "/" Keydown, focus onto that search bar 
        if (!keyDown) return
        searchInput.current.focus()
        // To Bypass prevent Default, needed to use onKeydown, but I only care about when Keyup (to stop multiple "/" being entered to begin with)
        setKeyHold(false)
    }, [keyDown])


    useEffect(() => {
        // To Bypass prevent Default, needed to use onKeydown, but I only care about when Keyup (to stop multiple "/" being entered to begin with)
        if (!keyUp) return
        if (keyHold) return
        setFocus(true)
    }, [keyUp])

    // Only update when it if already focused, so that when "/" is press, it doesnt auto-enter "/" in
    const onChange = (e) => {
        if (!focus) return
        setSearchText(e.target.value)
    }

    const onSearch = () => {
        navigate(`${searchText}`)
    }

    // useEffect(() => {
    //     navigate(`${searchText}`)
    // }, [enterKeyPress.keyDown])

    return (
        <Navbar bg="dark" variant="dark" >
            <Container fluid>
                <Navbar.Brand href="/">Arkham Brainstormer</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="investigators">Deck Builder</Nav.Link>
                        <Nav.Link href="/">Cards Info</Nav.Link>
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
                            ref={searchInput}
                            value={searchText}
                            onChange={onChange}
                            onBlur={() => setFocus(false)}
                            onClick={() => setFocus(true)}
                        />
                        <Button variant="outline-success" onClick={onSearch}>Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}