import { Accordion, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { BsGearFill, BsBellFill } from "react-icons/bs"

export default function Header() {

    return (
        <Navbar bg="dark" variant="dark" >
            <Container fluid>
                <Navbar.Brand href="#" className='h1 m-0 align-middle' style={{ fontFamily: 'Rubik Moonrocks' }}>BuLaxy</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                    <Nav onSelect={() => { }}>
                        <Nav.Link eventKey="notificationOffcanvasPane"><BsBellFill /></Nav.Link>
                        <Nav.Link eventKey="settingOffcanvasPane"><BsGearFill /></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}