import React, {Component} from 'react';
import {Layer, Stage, Rect, Line, Circle} from 'react-konva';
import ReactStateAnimation from 'react-state-animation';

import _extend from 'lodash/extend';
import _get from 'lodash/get';
import _delay from 'lodash/delay';

const birdSpeed = 2000;
const stageWidth = 400;
const stageHeight = 400;
const corridorWidth = 25;

const barriers = [
	{x: 50, y: 50, w: 10, h: 120, c: '#8664d5'},
	{x: 50, y: 50, w: 50, h: 10, c: '#8664d5'},

	{x: 160, y: 50, w: 80, h: 10, c: 'green'},
	{x: 160, y: 110, w: 80, h: 50, c: 'blue'},

	{x: 290, y: 50, w: 50, h: 10, c: '#8664d5'},
	{x: 340, y: 50, w: 10, h: 120, c: '#8664d5'},

	{x: 50, y: 250, w: 100, h: 50, c: 'orange'},
	{x: 300, y: 250, w: 50, h: 100, c: 'yellow'}
];

class Game extends Component {
	constructor(props) {
		super(props);

		this.handleKeys = this.handleKeys.bind(this);

		this.state = {
			birdX: corridorWidth,
			birdY: stageHeight / 2,
			birdColor: 'white'
		};

		this._animate = new ReactStateAnimation(this);
	}

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeys);
	}

	componentWillUpdate(nextProps, nextState) {
	}

	componentDidUpdate(prevProps, prevState) {
	}

	// start animation
	moveRight() {
		this._animate.linearIn('birdX', stageWidth - corridorWidth, ((stageWidth - this.state.birdX) / stageWidth * birdSpeed));
		this.setState({birdColor: 'white'});
	}
	moveLeft() {
		this._animate.linearIn('birdX', corridorWidth, this.state.birdX / stageWidth * birdSpeed);
		this.setState({birdColor: 'yellow'});
	}
	moveUp() {
		this._animate.linearIn('birdY', corridorWidth, this.state.birdY / stageHeight * birdSpeed);
	}
	moveDown() {
		this._animate.linearIn('birdY', stageHeight - corridorWidth, ((stageHeight - this.state.birdY) / stageHeight * birdSpeed));
	}

	stop() {
		this._animate.stop();
	}

	handleKeys(e) {
		e.preventDefault();

		switch (e.key) {
			case 'ArrowRight':
				this.stop();
				_delay(() => { this.moveRight(); }, 50);

				break;
			case 'ArrowLeft':
				this.stop();
				_delay(() => { this.moveLeft(); }, 50);

				break;
			case 'ArrowUp':
				this.stop();
				_delay(() => { this.moveUp(); }, 50);

				break;
			case 'ArrowDown':
				this.stop();
				_delay(() => { this.moveDown(); }, 50);

				break;
			default:
				break;
		}
	}

	render() {
		return (
			<div className="game">
				<Stage
					width={stageWidth}
					height={stageHeight}
				>
					<Layer>
						{barriers.map((barrier, i) =>
							<Rect
								x={barrier.x}
								y={barrier.y}
								width={barrier.w}
								height={barrier.h}
								stroke={barrier.c}
								shadowBlur={10}
								key={i}
							/>
						)}
						<Line
							points={[0, stageHeight / 2 - corridorWidth, 0, 0, stageWidth, 0, stageWidth, stageHeight / 2 - corridorWidth]}
							stroke="red"
							strokeWidth={5}
							lineCap="round"
							lineJoin="round"
						/>
						<Line
							points={[0, stageHeight / 2 + corridorWidth, 0, stageHeight, stageWidth, stageHeight, stageWidth, stageHeight / 2 + corridorWidth]}
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
