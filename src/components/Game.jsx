import React, {Component} from 'react';
import {Layer, Stage, Line, Circle, Ellipse} from 'react-konva';

import _extend from 'lodash/extend';
import _delay from 'lodash/delay';
import _findIndex from 'lodash/findIndex';

const stageWidth = 560; // 80 的培數
const stageHeight = 400;
const stepSize = 80;
const barriers = [
	{x: 80, y: 120, w: 5, h: 40, c: '#8664d5'},
	{x: 80, y: 200, w: 5, h: 40, c: '#b65432'},
	{x: 320, y: 200, w: 5, h: 40, c: '#b22222'},
	{x: 320, y: 40, w: 5, h: 40, c: '#985764'},
	{x: 400, y: 360, w: 5, h: 40, c: '#98b736'},

	{x: 120, y: 80, w: 40, h: 5, c: '#099876'},
	{x: 360, y: 320, w: 40, h: 5, c: '#98b736'}
];
const dots = [
	{x: 40, y: 40, r: 5, c: '#bbb'},
	{x: 120, y: 40, r: 5, c: '#bbb'},
	{x: 200, y: 200, r: 5, c: '#bbb'},
	{x: 280, y: 200, r: 5, c: '#bbb'},
	{x: 360, y: 40, r: 5, c: '#bbb'},
	{x: 360, y: 120, r: 5, c: '#bbb'},
	{x: 360, y: 360, r: 5, c: '#bbb'},
	{x: 520, y: 360, r: 5, c: '#bbb'}
];

class Game extends Component {
	constructor(props) {
		super(props);

		this.handleKeys = this.handleKeys.bind(this);

		this.state = {
			birdX: stepSize / 2,
			birdY: stageHeight / 2,
			birdColor: 'white',
			dots: dots,
			score: 0
		};
	}
	componentWillMount() {
		// 会在组件render之前执行，并且永远都只执行一次。
	}

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeys);
		// 这个方法会在组件加载完毕之后立即执行
	}

	componentWillUpdate(nextProps, nextState) {
		// console.log('componentWillUpdate');
		// console.log('this.state', this.state.birdX);
		// console.log('nextState', nextState.birdX);
	}

	componentDidUpdate(prevProps, prevState) {
	}

	// start animation
	move(direction) {
		if (direction === 'right') {
			this.setState({
				birdX: this.state.birdX + stepSize
			});
		} else if (direction === 'left') {
			this.setState({
				birdX: this.state.birdX - stepSize
			});
		} else if (direction === 'up') {
			this.setState({
				birdY: this.state.birdY - stepSize
			});
		} else if (direction === 'down') {
			this.setState({
				birdY: this.state.birdY + stepSize
			});
		}
		this.eatDot();
	}

	eatDot() {
		let i = _findIndex(this.state.dots, {x: this.state.birdX, y: this.state.birdY});
		if (i > -1) {
			this.setState({
				dots: _extend(this.state.dots, {
					[i]: {x: 0, y: 0}
				}),
				score: this.state.score + 5
			});
		}
	}

	handleKeys(e) {
		e.preventDefault();
		switch (e.code) {
			case 'ArrowRight':
				if (this.state.birdX !== (stageWidth - stepSize / 2)) { // not going out the edge
					if (_findIndex(barriers, {x: this.state.birdX + stepSize / 2, y: this.state.birdY}) === -1) { // no barrier
						this.move('right');
					}
				}

				break;
			case 'ArrowLeft':
				if (this.state.birdX !== (stepSize / 2)) {
					if (_findIndex(barriers, {x: this.state.birdX - stepSize / 2, y: this.state.birdY}) === -1) {
						this.move('left');
					}
				}

				break;
			case 'ArrowUp':
				if (this.state.birdY !== (stepSize / 2)) {
					if (_findIndex(barriers, {x: this.state.birdX, y: this.state.birdY - stepSize / 2}) === -1) {
						this.move('up');
					}
				}

				break;
			case 'ArrowDown':
				if (this.state.birdY !== (stageHeight - stepSize / 2)) {
					if (_findIndex(barriers, {x: this.state.birdX, y: this.state.birdY + stepSize / 2}) === -1) {
						this.move('down');
					}
				}

				break;
			case 'Space':
				console.log('space');

				break;
			default:
				break;
		}
	}

	render() {
		// console.log('x:', this.state.birdX);
		// console.log('y:', this.state.birdY);
		let message = '';
		if (this.state.score === 40) {
			message = '我真係恭喜你呀';
		}
		return (
			<div className="game">
				<p>score: {this.state.score}</p>
				<Stage
					width={stageWidth}
					height={stageHeight}
				>
					<Layer>
						{barriers.map((barrier, i) =>
							<Ellipse
								x={barrier.x}
								y={barrier.y}
								radiusX={barrier.w}
								radiusY={barrier.h}
								fill={barrier.c}
								key={i}
							/>
						)}
						{this.state.dots.map((dot, i) =>
							<Circle
								radius={5}
								fill={dot.c}
								x={dot.x}
								y={dot.y}
								key={i}
								ref={(c) => { this.dot = c; }}
							/>
						)}
						<Line
							points={[0, stepSize * 2, 0, 0, stageWidth, 0, stageWidth, stepSize * 2]}
							stroke="red"
							strokeWidth={5}
							lineCap="round"
							lineJoin="round"
						/>
						<Line
							points={[0, stageHeight - stepSize * 2, 0, stageHeight, stageWidth, stageHeight, stageWidth, stageHeight - stepSize * 2]}
							stroke="red"
							strokeWidth={5}
							lineCap="round"
							lineJoin="round"
						/>
						<Circle
							radius={15}
							fill={this.state.birdColor}
							x={this.state.birdX}
							y={this.state.birdY}
							ref={(c) => { this.bird = c; }}
						/>
					</Layer>
				</Stage>
				<p>{message}</p>
			</div>
		);
	}
}

Game.propTypes = {
};

export default Game;
