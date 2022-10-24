import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/esm/Button';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Pathfinding Visualizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>

            <NavDropdown title="Algorithms" id="basic-nav-dropdown">
              <NavDropdown.Item href="#bfs">BFS</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Button className='handle-visualize'>
              Visualize BFS Algorithm
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container><App /></Container>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
