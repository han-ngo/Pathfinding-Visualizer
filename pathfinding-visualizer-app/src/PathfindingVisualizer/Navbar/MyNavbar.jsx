import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/esm/Button';
import './MyNavbar.css'

export default class MyNavbar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
  
	render() {
    const {onSelect} = this.props;
		return (
			<Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Pathfinding Visualizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <NavDropdown title="Algorithms" className="basic-nav-dropdown" onSelect={(e) => onSelect(e)}>
              <NavDropdown.Item eventKey="Dijkstra" href="#">Dijkstra's Algorithm</NavDropdown.Item>
              <NavDropdown.Item eventKey="BFS" href="#">Breadth-first Search</NavDropdown.Item>
              <NavDropdown.Item eventKey="DFS" href="#">Depth-first Search</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#clear">Clear Board</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>

          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Button className='handle-visualize'>
              Visualize BFS Algorithm
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
		);
	}
}