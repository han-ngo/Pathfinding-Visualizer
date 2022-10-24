import React, {Component} from 'react';
import Node from './Node/Node';
import {bfs} from '../Algorithms/bfs';
import './PathfindingVisualizer.css'

const GRID_HEIGHT = 15,
      GRID_WIDTH  = 50,
      START_NODE_ROW = 10,
      START_NODE_COL = 10,
      TARGET_NODE_ROW = 1,
      TARGET_NODE_COL = 45;

export default class PathfindingVisualizer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			grid: []
		};
	}

	render() {
    const {grid} = this.state;
    console.log(grid);

		return (
      <>
        <button onClick={() => this.visualizeBFS()}>
          Visualize Dijkstra's Algorithm
        </button>
        <div className='grid'>
          {grid.map((row, rowIndex) => {
            return <div className='row' key={rowIndex}>
              {row.map((node, nodeIndex) => {
                const {row, col, isStart, isTarget} = node
                return (
                  <Node
                    row={row}
                    col={col}
                    key={nodeIndex} /* key is needed for iterable items */
                    isStart={isStart}
                    isTarget={isTarget}
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
  }

  visualizeBFS() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const targetNode = grid[TARGET_NODE_ROW][TARGET_NODE_COL];
    const path = bfs(grid, startNode, targetNode);

    this.markPath(path);
    console.log("path: " + path)
  }

  markPath(path) {
    for (const node of path) {
      const {row, col, isStart, isTarget} = node
      console.log(node.row + ' ' + node.col);
      document.getElementById(`node-${node.row}-${node.col}`).classList.add('shortestPath');
    }
  }
}

const createNode = (row, col) => {
  return {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isTarget: row === TARGET_NODE_ROW && col === TARGET_NODE_COL,
    isVisited: false
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