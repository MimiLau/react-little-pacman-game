import React, {Component, PropTypes} from 'react';
import {Button} from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Swipeable from 'react-swipeable';
import Qrcode from '../components/Qrcode';

class Slideshow extends Component {
	constructor(props) {
		super(props);

		this.onSwiped = this.onSwiped.bind(this);
		this.onitemClick = this.onitemClick.bind(this);

		this.state = {
			page: 0,
			isFront: true,
			isItemClicked: false
		};
	}

	onSwiped(e, x) {
		if (x > 0 && this.state.page < 3) {
			this.nextSlide();
		} else if (x < 0 && this.state.page > 0) {
			this.prevSlide();
		}
	}

	onArrowClick(direction) {
		if (direction === 'right' && this.state.page < 3) {
			this.nextSlide();
		} else if (direction === 'left' && this.state.page > 0) {
			this.prevSlide();
		}
	}

	onitemClick() {
		this.setState({
			isItemClicked: !this.state.isItemClicked
		});
	}

	onFaceClick(face) {
		this.setState({
			isItemClicked: false
		});

		if (face === 'front') {
			this.setState({
				isFront: true
			});
		} else {
			this.setState({
				isFront: false
			});
		}
	}

	prevSlide() {
		this.setState({
			page: this.state.page - 1,
			isFront: true,
			isItemClicked: false
		});
	}

	nextSlide() {
		this.setState({
			page: this.state.page + 1,
			isFront: true,
			isItemClicked: false
		});
	}

	render() {
		let isProductPage = this.state.page > 0 && this.state.page !== 3;
		let productInfo = this.props.products[this.state.page - 1];
		return (
			<div className="slideshow">
				<Swipeable
					trackMouse
					onSwiped={this.onSwiped}
					nodeName="div"
				>
					<Button
						disabled={this.state.page === 0}
						className="btn--img btn--arrow btn--left"
						onClick={() => this.onArrowClick('left')}
					>
						<img src="img/icon-arrow-l.png" role="presentation" />
					</Button>
					<Button
						className="btn--img btn--arrow btn--right"
						onClick={() => this.onArrowClick('right')}
						disabled={this.state.page === 3}
					>
						<img src="img/icon-arrow-r.png" role="presentation" />
					</Button>
					<ReactCSSTransitionGroup
						transitionName="fade"
						transitionAppear
						transitionAppearTimeout={500}
						transitionEnterTimeout={300}
						transitionLeave={false}
					>
						<div className="slider-wrapper" key={this.state.page}>
							{isProductPage &&
								<div>
									<div className="product-name">
										<p className="text--sm mb-0">Moncler盟可睐</p>
										<p className="h5 mb-0 product-name">{productInfo.name}</p>
									</div>
									<div className="slide--product">
										<Button className={`btn--img btn--product ${this.state.isItemClicked ? 'btn--product-fade' : ''}`} onClick={this.onitemClick}>
											<ReactCSSTransitionGroup
												transitionName="fade"
												transitionEnterTimeout={300}
												transitionLeave={false}
											>
												{this.state.isFront ?
													<img src={productInfo.img[0].src} role="presentation" className="img-fluid" key="front" /> :
													<img src={productInfo.img[1].src} role="presentation" className="img-fluid" key="back" />
												}
												{this.state.isItemClicked &&
													<div className="slider-description" key="description">{productInfo.description}</div>
												}
												<p className="slide--product-helptext">
													{this.state.isItemClicked ? '再次点击返回' : '点击查看更多'}
												</p>
											</ReactCSSTransitionGroup>
										</Button>
									</div>
									<div className="row product-face">
										<div className="col-xs-4 offset-xs-2">
											<Button onClick={() => this.onFaceClick('front')} className="btn--face">
												<img src={productInfo.img[0].src} role="presentation" className="img-fluid" />
											</Button>
										</div>
										<div className="col-xs-4">
											<Button onClick={() => this.onFaceClick('back')} className="btn--face">
												<img src={productInfo.img[1].src} role="presentation" className="img-fluid" />
											</Button>
										</div>
									</div>
									<div className="row moving-bar-wrapper">
										<div className="col-xs-8 offset-xs-2">
											<div className={`${this.state.isFront ? 'moving-bar' : 'moving-bar--right'}`} />
										</div>
									</div>
									<a
										href={productInfo.link}
										target="_blank"
										rel="noopener noreferrer"
										className="btn btn-primary"
										onClick={() => this.props.onShopClick(productInfo.name)}
									>选购</a>
								</div>
							}
							{this.state.page === 0 &&
								<div>
									<h2 className="h4 mb-2 mt-1">恭贺锦绣新春</h2>
									<div className="slide--intro">
										<p>Moncler盟可睐首次倾心呈现「锦绣新春」特别版男女外套，迎接即将于2017年1月28日到来的丁酉鸡年。</p>
										<p>全新释出的新春外套系列，<br />以现代视角独到诠释迷人东方神韵；<br />明丽焰红点缀及洒金细节加持，<br />恰到好处演绎欢乐节气气氛，<br />唤「型」你的时髦二零一七。</p>
									</div>
									<img src="img/gensture.png" role="presentation" width="130" />
									<p className="text--xs">划动浏览新春系列</p>
								</div>
							}
							{this.state.page === 3 &&
								<div className="mt-1">
									<Qrcode />
									<p className="my-2">Moncler盟可睐「锦绣新春」特别版男女外套将于 2017 年 1 月起登陆各大品牌专卖店，访问 moncler.cn ，亦可在线订购。</p>
									<a
										href="http://www.moncler.cn"
										target="_blank"
										rel="noopener noreferrer"
										className="btn btn-primary"
										disabled={this.state.page === 0}
										onClick={() => this.props.onShopClick('MONCLER.CN')}
									>MONCLER.CN</a>
								</div>
							}
						</div>
					</ReactCSSTransitionGroup>
				</Swipeable>
			</div>
		);
	}
}

Slideshow.propTypes = {
	products: PropTypes.array,
	onShopClick: PropTypes.func
};

export default Slideshow;
