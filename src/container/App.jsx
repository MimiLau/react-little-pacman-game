import React, {Component} from 'react';
import createjs from 'preload-js';
import classNames from 'classnames';

import _flattenDeep from 'lodash/flattenDeep';
import _values from 'lodash/values';
import _toNumber from 'lodash/toNumber';
import _mapValues from 'lodash/mapValues';

import ProgressBar from '../components/ProgressBar';
import Topbar from '../components/Topbar';
import Game from '../components/Game';

import productData from '../mock/data.json';

let preload;
// let mixins = [tweenState.Mixin];
// console.log(mixins);

class App extends Component {
	constructor(props) {
		super(props);

		this.handleFileLoadProgress = this.handleFileLoadProgress.bind(this);
		this.state = {
			page: 'home',
			loadingPercentage: 0
		};
	}

	componentDidMount() {
		preload = new createjs.LoadQueue(false);

		preload.loadFile(
			{src: productData.video, type: createjs.AbstractLoader.Video}
		);
		preload.loadManifest(
			[
				...productData.others,
				..._flattenDeep(_values(_mapValues(productData.products, 'img')))
			]
		);

		preload.setMaxConnections(3); // Set a higher number to load multiple items at once
		preload.maintainScriptOrder = true; // Ensure scripts are loaded in order

		// preload.on('fileload', this.handleFileLoad); // A single file has completed loading.
		preload.on('progress', this.handleFileLoadProgress); // A single file has completed loading.
	}

	componentWillUnmount() {
	}

	handleFileLoadProgress(event) {
		this.setState({
			loadingPercentage: _toNumber((event.progress * 100).toFixed(0))
		});
	}

	renderGame() {
		return (
			<div>
				<div className="row-contents text-xs-center">
					<Game />
				</div>
			</div>
		);
	}


	render() {
		// let pageShow = this.state.page;
		let appClass = classNames({
			container: true,
			app: true,
			'app--home': (this.state.page === 'home'),
			'app--video': (this.state.page === 'video')
		});
		return (
			<main className={appClass}>
				<Topbar />
				{this.state.loadingPercentage === 100 ?
					this.renderGame() :
					<ProgressBar key="progressbar" />
				}
			</main>
		);
	}
}

export default App;
