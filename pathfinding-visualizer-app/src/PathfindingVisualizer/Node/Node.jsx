import React, {Component} from 'react';
import './Node.css'

export default class Node extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {row, col, isStart, isTarget, isWall, onMouseDown, onMouseEnter, onMouseUp} = this.props;
		const nodeClassName = isStart ? 'start-node fas fa-location-arrow ' : isTarget ? 'target-node fas fa-star ' : isWall ? 'wall-node ' : '';
		return (
			<div
				id={`node-${row}-${col}`}
				className={`node ${nodeClassName}`}
				onMouseDown={() => onMouseDown(row, col)}
				onMouseEnter={() => onMouseEnter(row, col)}
				onMouseUp={() => onMouseUp(row, col)}
			></div>
		);
	}
}
