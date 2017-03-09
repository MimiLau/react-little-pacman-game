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

// const birdSpeed = 2000;
const stageWidth = 560; // 80 的培數
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

	}

	componentDidUpdate(prevProps, prevState) {
		// if (_map(_filter(barriers, _matches({y: this.state.birdY})), 'x').indexOf(this.state.birdX + corridorWidth / 2) !== -1) {
		// 	console.log('right has barrier');
		// 	window.clearInterval(movementRight);
		// }
		// console.log('prevState', prevState.birdX);
		// console.log('this.state', this.state.birdX);
		if (prevState.birdX < this.state.birdX) {
			console.log('right');
		} else if (prevState.birdX > this.state.birdX) {
			console.log('left');
		}

		if (prevState.birdY < this.state.birdY) {
			console.log('down');
		} else if (prevState.birdY > this.state.birdY) {
			console.log('up');
		}
	}

	componentWillUnmount() {
		console.log('componentWillUnmount');
	}

	// start animation
	moveRight() {
		// this._animate.linearIn('birdX', stageWidth - corridorWidth, ((stageWidth - this.state.birdX) / stageWidth * birdSpeed));
		this.setState({
			birdX: this.state.birdX + corridorWidth
		});
	}

	moveLeft() {
		this.setState({
			birdX: this.state.birdX - corridorWidth
		});
	}
	moveUp() {
		this.setState({
			birdY: this.state.birdY - corridorWidth
		});
	}
	moveDown() {
		this.setState({
			birdY: this.state.birdY + corridorWidth
		});
	}

	handleKeys(e) {
		// e.preventDefault();
		switch (e.code) {
			case 'ArrowRight':
				if (this.state.birdX !== (stageWidth - corridorWidth / 2)) { // not going out the edge
					if (_map(_filter(barriers, _matches({y: this.state.birdY})), 'x').indexOf(this.state.birdX + corridorWidth / 2) !== -1) {
						console.log('right has barrier');
					} else {
						this.moveRight();
					}
				}

				break;
			case 'ArrowLeft':
				if (this.state.birdX !== (corridorWidth / 2)) {
					if (_map(_filter(barriers, _matches({y: this.state.birdY})), 'x').indexOf(this.state.birdX - corridorWidth / 2) !== -1) {
						console.log('left has barrier');
					} else {
						this.moveLeft();
					}
				}

				break;
			case 'ArrowUp':
				if (this.state.birdY !== (corridorWidth / 2)) {
					if (_map(_filter(barriers, _matches({x: this.state.birdX})), 'y').indexOf(this.state.birdY - corridorWidth / 2) !== -1) {
						console.log('up has barrier');
					} else {
						this.moveUp();
					}
				}

				break;
			case 'ArrowDown':
				if (this.state.birdY !== (stageHeight - corridorWidth / 2)) {
					if (_map(_filter(barriers, _matches({x: this.state.birdX})), 'y').indexOf(this.state.birdY + corridorWidth / 2) !== -1) {
						console.log('down has barrier');
					} else {
						this.moveDown();
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
