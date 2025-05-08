import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Footer() {
  return (

      <Navbar className="bg-body-tertiary" data-bs-theme="dark">
        <Container>
          <Navbar.Text className="text-muted">Sudoku © 2025. All rights reserved</Navbar.Text>
        </Container>

      
      </Navbar>

  );
}

export default Footer;