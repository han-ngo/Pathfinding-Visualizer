import React, {Component} from 'react';
import './Node.css'

export default class Node extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {row, col, isStart, isTarget} = this.props;
		const nodeClassName = isStart ? 'start-node' : isTarget ? 'target-node' : '';
		return (
			<div
				id={`node-${row}-${col}`}
				className={`node ${nodeClassName}`}></div>
		);
	}
}
