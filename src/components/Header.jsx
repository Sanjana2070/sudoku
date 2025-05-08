import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar-expand-lg" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Sudoku</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="easy">Easy</Nav.Link>
            <Nav.Link href="medium">Medium</Nav.Link>
            <Nav.Link href="hard">Hard</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="rules">Rules</Nav.Link>
            <Nav.Link href="about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;