import React, {Component} from 'react';
import {Layer, Stage, Line, Circle, Ellipse} from 'react-konva';

import _extend from 'lodash/extend';
import _get from 'lodash/get';
import _delay from 'lodash/delay';
import _find from 'lodash/find';
import _matches from 'lodash/matches';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import _hasIn from 'lodash/hasIn';

let movementRight;
let movementLeft;
let movementUp;
let movementDown;
// const birdSpeed = 2000;
const stageWidth = 400;
const stageHeight = 400;
const corridorWidth = 80;
const barriers = [
	{x: 80, y: 120, w: 5, h: 40, c: '#8664d5'},
	{x: 80, y: 200, w: 5, h: 40, c: '#b65432'},
	{x: 320, y: 200, w: 5, h: 40, c: '#b22222'},
	{x: 320, y: 40, w: 5, h: 40, c: '#985764'},

	{x: 120, y: 80, w: 40, h: 5, c: '#099876'}
];

class Game extends Component {
	constructor(props) {
		super(props);

		this.handleKeys = this.handleKeys.bind(this);

		this.state = {
			birdX: corridorWidth / 2,
			birdY: stageHeight / 2,
			birdColor: 'white'
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
		if (nextState.birdX >= stageWidth - corridorWidth / 2) {
			console.log('stop moving right');
			window.clearInterval(movementRight);
		}
		if (nextState.birdX <= corridorWidth / 2) {
			console.log('stop moving left');
			window.clearInterval(movementLeft);
		}
		if (nextState.birdY <= corridorWidth / 2) {
			console.log('stop moving up');
			window.clearInterval(movementUp);
		}
		if (nextState.birdY >= stageHeight - corridorWidth / 2) {
			console.log('stop moving down');
			window.clearInterval(movementDown);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		// if (_map(_filter(barriers, _matches({y: this.state.birdY})), 'x').indexOf(this.state.birdX + corridorWidth / 2) !== -1) {
		// 	console.log('right has barrier');
		// 	window.clearInterval(movementRight);
		// }
	}

	componentWillUnmount() {
		console.log('componentDidMount');
	}

	// start animation
	moveRight() {
		this.setState({
			birdX: this.state.birdX + corridorWidth,
			birdColor: 'white'
		});
		// movementRight = window.setInterval(() => {
		// 	this.setState({
		// 		birdX: this.state.birdX + corridorWidth
		// 	});
		// }, 500);
	}

	moveLeft() {
		this.setState({
			birdX: this.state.birdX - corridorWidth,
			birdColor: 'yellow'
		});
		// movementLeft = window.setInterval(() => {
		// 	this.setState({
		// 		birdX: this.state.birdX - corridorWidth
		// 	});
		// }, 500);
	}
	moveUp() {
		this.setState({
			birdY: this.state.birdY - corridorWidth
		});
		// movementUp = window.setInterval(() => {
		// 	this.setState({
		// 		birdY: this.state.birdY - corridorWidth
		// 	});
		// }, 500);
	}
	moveDown() {
		this.setState({
			birdY: this.state.birdY + corridorWidth
		});
		// movementDown = window.setInterval(() => {
		// 	this.setState({
		// 		birdY: this.state.birdY + corridorWidth
		// 	});
		// }, 500);
	}

	handleKeys(e) {
		// e.preventDefault();
		switch (e.code) {
			case 'ArrowRight':
				if (this.state.birdX !== (stageWidth - corridorWidth / 2)) { // not going out the edge
					// if (this.state.birdY === 200 && this.state.birdX < 160 - corridorWidth / 2) { // check barrier with same y
					// 	window.clearInterval(movementLeft);
					// 	window.clearInterval(movementUp);
					// 	window.clearInterval(movementDown);
					// 	this.moveRight();
					// } else if (this.state.birdY === 200 && this.state.birdX >= 160 - corridorWidth / 2) {
					// 	window.clearInterval(movementRight);
					// }

					if (_map(_filter(barriers, _matches({y: this.state.birdY})), 'x').indexOf(this.state.birdX + corridorWidth / 2) !== -1) {
						console.log('right has barrier');
						// window.clearInterval(movementRight);
					} else {
						this.moveRight();
					}
				}

				break;
			case 'ArrowLeft':
				if (this.state.birdX !== (corridorWidth / 2)) {
				// 	window.clearInterval(movementRight);
				// 	window.clearInterval(movementUp);
				// 	window.clearInterval(movementDown);
				// 	this.moveLeft();
					if (_map(_filter(barriers, _matches({y: this.state.birdY})), 'x').indexOf(this.state.birdX - corridorWidth / 2) !== -1) {
						console.log('left has barrier');
						// window.clearInterval(movementRight);
					} else {
						this.moveLeft();
					}
				}
				// console.log(_map(_filter(barriers, _matches({y: this.state.birdY})), 'x'));


				break;
			case 'ArrowUp':
				if (this.state.birdY !== (corridorWidth / 2)) {
					// window.clearInterval(movementRight);
					// window.clearInterval(movementLeft);
					// window.clearInterval(movementDown);
					// this.moveUp();
					if (_map(_filter(barriers, _matches({x: this.state.birdX})), 'y').indexOf(this.state.birdY - corridorWidth / 2) !== -1) {
						console.log('up has barrier');
						// window.clearInterval(movementRight);
					} else {
						this.moveUp();
					}
				}

				break;
			case 'ArrowDown':
				if (this.state.birdY !== (stageHeight - corridorWidth / 2)) {
					// window.clearInterval(movementRight);
					// window.clearInterval(movementUp);
					// window.clearInterval(movementLeft);
					// this.moveDown();
					if (_map(_filter(barriers, _matches({x: this.state.birdX})), 'y').indexOf(this.state.birdY + corridorWidth / 2) !== -1) {
						console.log('down has barrier');
						// window.clearInterval(movementRight);
					} else {
						this.moveDown();
					}
				}

				break;
			case 'Space':
				window.clearInterval(movementRight);
				window.clearInterval(movementUp);
				window.clearInterval(movementLeft);
				window.clearInterval(movementDown);

				break;
			default:
				break;
		}
	}

	render() {
		// console.log('x:', this.state.birdX);
		// console.log('y:', this.state.birdY);
		// console.log('y:', this.state.birdY, '--');
		return (
			<div className="game">
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
						<Line
							points={[0, corridorWidth * 2, 0, 0, stageWidth, 0, stageWidth, corridorWidth * 2]}
							stroke="red"
							strokeWidth={5}
							lineCap="round"
							lineJoin="round"
						/>
						<Line
							points={[0, stageHeight - corridorWidth * 2, 0, stageHeight, stageWidth, stageHeight, stageWidth, stageHeight - corridorWidth * 2]}
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
			</div>
		);
	}
}

Game.propTypes = {
};

export default Game;
