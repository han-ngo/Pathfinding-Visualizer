import React, {Component} from 'react';
import './Node.css'

export default class Node extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {isStart, isTarget} = this.props;
		const nodeClassName = isStart ? 'start-node' : isTarget ? 'target-node' : '';
		return (
			<div className={`node ${nodeClassName}`}></div>
		);
	}
}
