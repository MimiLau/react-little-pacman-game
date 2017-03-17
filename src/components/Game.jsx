import React, {Component} from 'react';
import {Layer, Stage, Circle, Rect, Line} from 'react-konva';
import ReactStateAnimation from 'react-state-animation';

import _extend from 'lodash/extend';
import _delay from 'lodash/delay';
import _findIndex from 'lodash/findIndex';
import _clone from 'lodash/clone';
import _sample from 'lodash/sample';

const stageWidth = 560; // 80 的培數
const stageHeight = 400;
const stepSize = 80;

const verticalBarriers = [
	{x: 80, y: 120},
	{x: 80, y: 200},
	{x: 160, y: 200},
	{x: 160, y: 280},
	{x: 320, y: 200},
	{x: 320, y: 40},
	{x: 240, y: 360}
];
const horizontalBarriers = [
	{x: 120, y: 80},
	{x: 200, y: 320},
	{x: 440, y: 160},
	{x: 520, y: 160},
	{x: 360, y: 320}
];
const dots = [
	{x: 40, y: 40},
	{x: 40, y: 360},
	{x: 120, y: 40},
	{x: 200, y: 200},
	// {x: 280, y: 200},
	{x: 360, y: 40},
	{x: 360, y: 120},
	{x: 360, y: 360},
	{x: 520, y: 360},
	{x: 520, y: 200}
];
const foods = [
	{x: 280, y: 40},
	{x: 280, y: 360},
	{x: 520, y: 120},
	{x: 120, y: 280},
	{x: 440, y: 280}
];
const ghosts = [
	{x: 280, y: 200, name: 'siufa'},
	{x: 440, y: 200, name: 'mama'}
];
let ghostMovement;

class Game extends Component {
	constructor(props) {
		super(props);

		this.handleKeys = this.handleKeys.bind(this);
		this.restart = this.restart.bind(this);

		this.state = {
			birdX: stepSize / 2,
			birdY: stageHeight / 2,
			birdColor: 'yellow',
			dots: _clone(dots),
			foods: _clone(foods),
			ghostX: _clone(ghosts[0].x),
			ghostY: _clone(ghosts[0].y),
			score: 0,
			message: ''
		};

		this._animate = new ReactStateAnimation(this);
	}
	componentWillMount() {
		// 会在组件render之前执行，并且永远都只执行一次。
		console.log('componentWillMount');
	}

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeys);
		// 这个方法会在组件加载完毕之后立即执行
		console.log('componentDidMount');
		this.ghostWalk();
	}

	componentWillUpdate(nextProps, nextState) {
		// console.log('componentWillUpdate');
		// console.log('this.state', this.state.birdX);
		// console.log('nextState', nextState.birdX);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.ghostX === this.state.birdX && this.state.ghostY === this.state.birdY) {
			this.died();
		}
		let fullScore = this.state.dots.length * 5 + this.state.foods.length * 10;
		if (this.state.score === fullScore) {
			this.win();
		}
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

	ghostMove(direction) {
		// console.log(direction);
		let noRightBarrier = _findIndex(verticalBarriers, {x: this.state.ghostX + stepSize / 2, y: this.state.ghostY}) === -1;
		let noLeftBarrier = _findIndex(verticalBarriers, {x: this.state.ghostX - stepSize / 2, y: this.state.ghostY}) === -1;
		let noUpBarrier = _findIndex(horizontalBarriers, {x: this.state.ghostX, y: this.state.ghostY - stepSize / 2}) === -1;
		let noDownBarrier = _findIndex(horizontalBarriers, {x: this.state.ghostX, y: this.state.ghostY + stepSize / 2}) === -1;

		if (direction === 'right' && noRightBarrier) {
			if (this.state.ghostX !== (stageWidth - stepSize / 2)) {
				// this._animate.linearIn('ghostX', this.state.ghostX + stepSize, 1000);
				this.setState({
					ghostX: this.state.ghostX + stepSize
				});
			}
		} else if (direction === 'left' && noLeftBarrier) {
			if (this.state.ghostX !== (stepSize / 2)) {
				// this._animate.linearIn('ghostX', this.state.ghostX - stepSize, 1000);
				this.setState({
					ghostX: this.state.ghostX - stepSize
				});
			}
		} else if (direction === 'up' && noUpBarrier) {
			if (this.state.ghostY !== (stepSize / 2)) {
				// this._animate.linearIn('ghostY', this.state.ghostY - stepSize, 1000);
				this.setState({
					ghostY: this.state.ghostY - stepSize
				});
			}
		} else if (direction === 'down' && noDownBarrier) {
			if (this.state.ghostY !== (stageHeight - stepSize / 2)) {
				// this._animate.linearIn('ghostY', this.state.ghostY + stepSize, 1000);
				this.setState({
					ghostY: this.state.ghostY + stepSize
				});
			}
		} else {
			console.log('sleeping');
		}
	}

	eatDot() {
		// small dots
		let i = _findIndex(this.state.dots, {x: this.state.birdX, y: this.state.birdY});
		if (i > -1) {
			this.setState({
				dots: _extend(this.state.dots, {
					[i]: {x: -40, y: -40}
				}),
				score: this.state.score + 5
			});
		}

		// big dots
		let h = _findIndex(this.state.foods, {x: this.state.birdX, y: this.state.birdY});
		if (h > -1) {
			this.setState({
				foods: _extend(this.state.foods, {
					[h]: {x: -40, y: -40}
				}),
				score: this.state.score + 10
			});
		}
	}

	ghostWalk() {
		// random walk {direction} every 1000
		// if has barrier, random walk {direction}

		console.log('ghostWalk');

		ghostMovement = window.setInterval(() => {
			this.ghostMove(_sample(['left', 'right', 'up', 'down']));
		}, 1000);
	}

	restart() {
		this.setState({
			birdX: stepSize / 2,
			birdY: stageHeight / 2,
			birdColor: 'yellow',
			dots: _clone(dots),
			foods: _clone(foods),
			score: 0,
			ghostX: _clone(ghosts[0].x),
			ghostY: _clone(ghosts[0].y),
			message: ''
		});
		this.ghostWalk();
	}

	died() {
		window.clearInterval(ghostMovement);
		// console.log('died!!');
		if (this.state.message !== 'died!!') {
			this.setState({
				message: 'died!!'
			});
		}
	}

	win() {
		window.clearInterval(ghostMovement);
		// console.log('我真係恭喜你呀!!');
		if (this.state.message !== '我真係恭喜你呀!!') {
			this.setState({
				message: '我真係恭喜你呀!!'
			});
		}
	}

	handleKeys(e) {
		e.preventDefault();
		let noRightBarrier = _findIndex(verticalBarriers, {x: this.state.birdX + stepSize / 2, y: this.state.birdY}) === -1;
		let noLeftBarrier = _findIndex(verticalBarriers, {x: this.state.birdX - stepSize / 2, y: this.state.birdY}) === -1;
		let noUpBarrier = _findIndex(horizontalBarriers, {x: this.state.birdX, y: this.state.birdY - stepSize / 2}) === -1;
		let noDownBarrier = _findIndex(horizontalBarriers, {x: this.state.birdX, y: this.state.birdY + stepSize / 2}) === -1;

		switch (e.code) {
			case 'ArrowRight':
				if (this.state.birdX !== (stageWidth - stepSize / 2)) { // not going out the edge
					if (noRightBarrier) { // no barrier
						this.move('right');
					}
				}

				break;
			case 'ArrowLeft':
				if (this.state.birdX !== (stepSize / 2)) {
					if (noLeftBarrier) {
						this.move('left');
					}
				}

				break;
			case 'ArrowUp':
				if (this.state.birdY !== (stepSize / 2)) {
					if (noUpBarrier) {
						this.move('up');
					}
				}

				break;
			case 'ArrowDown':
				if (this.state.birdY !== (stageHeight - stepSize / 2)) {
					if (noDownBarrier) {
						this.move('down');
					}
				}

				break;
			case 'Space':
				console.log('space');
				window.clearInterval(ghostMovement);

				break;
			default:
				break;
		}
	}

	render() {
		// console.log('x:', this.state.birdX);
		// console.log('y:', this.state.birdY);
		return (
			<div className="game">
				<p>score: {this.state.score}</p>
				<button onClick={this.restart}>restart</button>
				<Stage
					width={stageWidth + 40}
					height={stageHeight + 40}
				>
					<Layer>
						<Rect
							x={0}
							y={0}
							width={stageWidth + 40}
							height={stageHeight + 40}
							fillRadialGradientStartPointX={stageWidth / 2}
							fillRadialGradientStartPointY={stageHeight / 2}
							fillRadialGradientEndPointX={stageWidth / 2}
							fillRadialGradientEndPointY={stageHeight / 2}
							fillRadialGradientStartRadius={stageWidth / 2}
							fillRadialGradientColorStops={[0, '#255180', 1, '#307ea4']}
						/>
					</Layer>
					<Layer
						offsetX="-20"
						offsetY="-20"
					>
						<Line
							points={[0, 0, stageWidth, 0, stageWidth, stageHeight, 0, stageHeight, 0, 0]}
							stroke="#60e8f4"
							strokeWidth="5"
							lineCap="round"
							lineJoin="round"
						/>
						{verticalBarriers.map((barrier, i) =>
							<Rect
								x={barrier.x}
								y={barrier.y}
								width="5"
								height={stepSize}
								fill="#60e8f4"
								OffsetY={stepSize / 2}
								key={i}
								cornerRadius="3"
							/>
						)}
						{horizontalBarriers.map((barrier, i) =>
							<Rect
								x={barrier.x}
								y={barrier.y}
								width={stepSize}
								height="5"
								fill="#60e8f4"
								OffsetX={stepSize / 2}
								key={i}
								cornerRadius="3"
							/>
						)}
						{this.state.dots.map((dot, i) =>
							<Circle
								radius="5"
								fill="#fff"
								x={dot.x}
								y={dot.y}
								key={i}
								ref={(c) => { this.dot = c; }}
							/>
						)}
						{this.state.foods.map((food, i) =>
							<Circle
								radius="10"
								fill="#fff"
								x={food.x}
								y={food.y}
								key={i}
								ref={(c) => { this.food = c; }}
							/>
						)}
						<Circle
							radius="15"
							fill={this.state.birdColor}
							x={this.state.birdX}
							y={this.state.birdY}
							ref={(c) => { this.bird = c; }}
						/>
						<Circle
							radius="10"
							fill="black"
							x={this.state.ghostX}
							y={this.state.ghostY}
							ref={(c) => { this.ghost0 = c; }}
						/>
					</Layer>
				</Stage>
				<p>{this.state.message}</p>
			</div>
		);
	}
}

Game.propTypes = {
};

export default Game;
