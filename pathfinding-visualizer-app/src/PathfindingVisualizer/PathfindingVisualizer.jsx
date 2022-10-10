import React, {Component} from 'react';
import Node from './Node/Node';
import './PathfindingVisualizer.css'

const GRID_HEIGHT = 15,
      GRID_WIDTH  = 50,
      START_NODE_ROW = 10,
      START_NODE_COL = 10,
      TARGET_NODE_ROW = 4,
      TARGET_NODE_COL = 45;

export default class PathfindingVisualizer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			grids: []
		};
	}

	render() {
    const {grids} = this.state;
    console.log(grids);

		return (
      <div className='grid'>
        {grids.map((row, rowIndex) => {
          return <div className='row' key={rowIndex}>
            {row.map((node, nodeIndex) => {
              const {isStart, isTarget} = node
              return (
                <Node
                  key={nodeIndex} /* key is needed for iterable items */
                  isStart={isStart}
                  isTarget={isTarget}
                  ></Node>
              );
          })}
          </div>
        })}
      </div>
		);
	}

  /* invoked immediately after a component is mounted (inserted into the tree) */
  componentDidMount() {
    const grids = [];
    for (let row = 0; row < GRID_HEIGHT; row++) {
      const curRow = [];
      for (let col = 0; col < GRID_WIDTH; col++) {
        const curNode = createNode(row, col);
        curRow.push(curNode);
      }
      grids.push(curRow);
    }

    this.setState({grids});
  }
}

const createNode = (row, col) => {
  return {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isTarget: row === TARGET_NODE_ROW && col === TARGET_NODE_COL
  };
};
