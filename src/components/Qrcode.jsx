import React from 'react';

const Qrcode = () => (
	<div className="row text-xs-center mb-1">
		<p>长按二维码关注我们</p>
		<div className="col-xs-8 offset-xs-2 qrcode">
			<img src="img/qr-code.png" role="presentation" className="img-fluid" />
		</div>
	</div>
);

export default Qrcode;
