import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Node from './Node/Node';
import MyNavbar from './Navbar/MyNavbar';
import {bfs, getBFSVistedNodesInOrder} from '../Algorithms/bfs';
import './PathfindingVisualizer.css'

const GRID_HEIGHT = 15,
      GRID_WIDTH  = 50;
let   START_NODE_ROW = 10,
      START_NODE_COL = 10,
      TARGET_NODE_ROW =  5,
      TARGET_NODE_COL = 45;

export default class PathfindingVisualizer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			grid: [],
      algorithm: "",
      mouseIsPressed: false,
      pressedNode: undefined
		};

    // TODO: why have to bind???
    this.visualizeAlgorithm = this.visualizeAlgorithm.bind(this);
	}

	render() {
    const {grid} = this.state;

		return (
      <>
        <MyNavbar 
          onSelect={(e) => this.handleSelectAlgo(e)}
          algoDesc={this.displayAlgoDesc()}
        />
        <Container>
        <div className='grid'>
          {grid.map((row, rowIndex) => {
            return <div className='row' key={rowIndex}>
              {row.map((node, nodeIndex) => {
                const {row, col, isStart, isTarget, isVisited, isWall, mouseIsPressed} = node
                return (
                  <Node
                    row={row}
                    col={col}
                    key={nodeIndex} /* key is needed for iterable items */
                    isStart={isStart}
                    isTarget={isTarget}
                    isVisited={isVisited}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                    onMouseUp={(row, col) => this.handleMouseUp(row, col)}
                    ></Node>
                );
            })}
            </div>
          })}
        </div>
        </Container>
      </>
		);
	}

  /* invoked immediately after a component is mounted (inserted into the tree) */
  componentDidMount() {
    const grid = initGrid();
    this.setState({grid});

    document.getElementsByClassName('handle-visualize')[0].addEventListener('click', this.visualizeAlgorithm);
  }

  handleSelectAlgo(event) {
    document.getElementsByClassName('handle-visualize')[0].innerHTML = 'Visualize ' + event + ' Algorithm';
    this.setState({algorithm: event});
  }

  handleMouseDown(row, col) {
    const newGrid = createNewGridOnWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true, pressedNode: this.state.grid[row][col]});
  }

  /* Invoke when mouse hover on grid */
  handleMouseEnter(row, col) {
    // Only toggle wall if mouseIsPressed
    const startNode = this.state.grid[START_NODE_ROW][START_NODE_COL];
    const targetNode = this.state.grid[TARGET_NODE_ROW][TARGET_NODE_COL];
    if (this.state.mouseIsPressed && this.state.pressedNode !== startNode && this.state.pressedNode !== targetNode) {
      const newGrid = createNewGridOnWallToggled(this.state.grid, row, col);
      this.setState({grid: newGrid});
    }
  }

  handleMouseUp(row, col) {
    const startNode = this.state.grid[START_NODE_ROW][START_NODE_COL];
    const targetNode = this.state.grid[TARGET_NODE_ROW][TARGET_NODE_COL];
    if (this.state.pressedNode === startNode || this.state.pressedNode === targetNode) {
      this.swapNodes(this.state.pressedNode, this.state.grid[row][col], this.state.pressedNode);
    }
    this.setState({mouseIsPressed: false, pressedNode: undefined});
  }

  swapNodes(oldNode, newNode, pressedNode) {
    const startNode = this.state.grid[START_NODE_ROW][START_NODE_COL];
    const targetNode = this.state.grid[TARGET_NODE_ROW][TARGET_NODE_COL];
    switch (pressedNode) {
      case startNode:
        START_NODE_ROW = newNode.row;
        START_NODE_COL = newNode.col;
        newNode.isStart = true;
        document.getElementById(`node-${newNode.row}-${newNode.col}`).className = 'node start-node fas fa-location-arrow';
        oldNode.isStart = false;
        document.getElementById(`node-${oldNode.row}-${oldNode.col}`).className = 'node';
        break;
      case targetNode:
        TARGET_NODE_ROW = newNode.row;
        TARGET_NODE_COL = newNode.col;
        newNode.isTarget = true;
        document.getElementById(`node-${newNode.row}-${newNode.col}`).className = 'node target-node fas fa-star';
        oldNode.isTarget = false;
        document.getElementById(`node-${oldNode.row}-${oldNode.col}`).className = 'node';
        break;
      default:
        break;
    }
  }

  visualizeAlgorithm() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const targetNode = grid[TARGET_NODE_ROW][TARGET_NODE_COL];
    let path, visitedNodesInOrder;

    switch (this.state.algorithm) {
      case 'BFS':
        path = bfs(grid, startNode, targetNode);
        visitedNodesInOrder = getBFSVistedNodesInOrder();
        break;
      case 'DFS':
        break;
      case 'Dijkstra':
        break;
      default:
        this.handleAlgoNotPicked();
        break;
    }

    this.animatePathFindingAlgo(path, visitedNodesInOrder);
  }

  handleAlgoNotPicked() {
    document.getElementsByClassName('handle-visualize')[0].innerHTML = 'Pick an Algorithm!';
  }

  animatePathFindingAlgo(path, visited) {
    if (path) {
      console.log('visualizing algorithm: ' + this.state.algorithm)
      for (let i = 0; i <= visited.length; i++) {
        // mark shortest path found
        if (i === visited.length) {
          setTimeout(() => {
            this.animateShortestPath(path);
          }, 10 * i);
          return;
        }
        // mark node as visited
        setTimeout(() => {
          const node = visited[i];
          if (!node.isStart && !node.isTarget) { // exclude animation on start & target node
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node visited-node';
          }
        }, 10 * i);
      }
    }
  }

  animateShortestPath(path) {
    if (!path) {
      this.alertPathNotFound();
      return;
    }
    for (let i = 0; i < path.length; i++) {
      // mark shortest path found
      setTimeout(() => {
        const node = path[i];
        if (!node.isStart && !node.isTarget) { // exclude animation on start & target node
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node shortestPath-node';
        }
      }, 25 * i);
    }
  }

  alertPathNotFound() {
    document.getElementsByClassName('path-not-found')[0].innerHTML = 'Path is NOT found! :(';
  }

  displayAlgoDesc() {
    switch (this.state.algorithm) {
      case 'BFS':
        return "Breath-first Search Algorithm is unweighted and guarantees the shortest path!"
      case 'DFS':
        return "Depth-first Search Algorithm is unweighted and does NOT guarantee the shortest path!"
      case 'Dijkstra':
        return "Dijkstra Algorithm is weighted and guarantees the shortest path!"
      default:
        return "Pick an algorithm to visualize!"
    }
  }

}

const createNode = (row, col) => {
  return {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isTarget: row === TARGET_NODE_ROW && col === TARGET_NODE_COL,
    isVisited: false,
    isWall: false
  };
};

const initGrid = () => {
  const grid = [];
  for (let row = 0; row < GRID_HEIGHT; row++) {
    const curRow = [];
    for (let col = 0; col < GRID_WIDTH; col++) {
      const curNode = createNode(row, col);
      curRow.push(curNode);
    }
    grid.push(curRow);
  }
  return grid;
};

const createNewGridOnWallToggled = (grid, row, col) => {
  // get a new copy of grid
  const newGrid = grid.slice();
  // toggle isWall for new node
  const node = grid[row][col];
  if (!node.isStart && !node.isTarget) { // cannot set wall on start and target node
    const newNode = {
      ...node,
      isWall: !node.isWall
    }
    // update new node on new grid
    newGrid[row][col] = newNode;
  }
  return newGrid;
};