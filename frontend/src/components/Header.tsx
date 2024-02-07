import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary bg-white shadow-sm mb-3">
      <Container>
        <Navbar.Brand href="/">IKR</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/create-activity">Create Activity</Nav.Link>
            <Nav.Link href="/about">About the app</Nav.Link>
          </Nav>
          <Link to="/user-service">
            <Button variant="outline-primary" className="me-2">
              Login
            </Button>
          </Link>
          <Link to="/user-service">
            <Button variant="outline-secondary">SignUp</Button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
