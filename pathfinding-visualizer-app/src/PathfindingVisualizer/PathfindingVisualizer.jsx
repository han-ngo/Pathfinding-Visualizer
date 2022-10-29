import React, {Component} from 'react';
import Node from './Node/Node';
import {bfs, getVistedNodesInOrder} from '../Algorithms/bfs';
import './PathfindingVisualizer.css'

const GRID_HEIGHT = 15,
      GRID_WIDTH  = 50,
      START_NODE_ROW = 10,
      START_NODE_COL = 10,
      TARGET_NODE_ROW = 5,
      TARGET_NODE_COL = 45;

export default class PathfindingVisualizer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			grid: [],
      mouseIsPressed: false
		};

    // TODO: why have to bind???
    this.visualizeBFS = this.visualizeBFS.bind(this);
	}

	render() {
    const {grid} = this.state;

		return (
      <>
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
                    onMouseUp={() => this.handleMouseUp()}
                    ></Node>
                );
            })}
            </div>
          })}
        </div>
      </>
		);
	}

  /* invoked immediately after a component is mounted (inserted into the tree) */
  componentDidMount() {
    const grid = initGrid();
    this.setState({grid});

    document.getElementsByClassName('handle-visualize')[0].addEventListener('click', this.visualizeBFS);
  }

  handleMouseDown(row, col) {
    const newGrid = createNewGridOnWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  /* Invoke when mouse hover on grid */
  handleMouseEnter(row, col) {
    // Only toggle wall if mouseIsPressed
    if (this.state.mouseIsPressed) {
      const newGrid = createNewGridOnWallToggled(this.state.grid, row, col);
      this.setState({grid: newGrid});
    }
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  visualizeBFS() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const targetNode = grid[TARGET_NODE_ROW][TARGET_NODE_COL];
    const path = bfs(grid, startNode, targetNode);
    const visitedNodesInOrder = getVistedNodesInOrder();

    this.animatePathFindingAlgo(path, visitedNodesInOrder);
    // this.markPath(path);
  }

  animatePathFindingAlgo(path, visited) {
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