var config = {
	// basePath: "http://staging.redantasia.rocks/moncler-cny-minisite",
	basePath: "http://redant.ezretailpro.com/moncler-cny-minisite",
	baseSubPath: "/index.php" // production "index.php", test ""
	// utm: "?utm_source=" + utm_source + "&utm_medium=" + utm_medium + "&utm_campaign=" + utm_campaign + "&utm_content="
};

$(function () {
	var apiUrl = config.basePath + '/wechat-cms' + config.baseSubPath + '/wp-json/wechat/v1/';

	$.ajax({
		url: apiUrl + 'get_js_api_settings',
		method: 'post',
		data: {
			url: window.location.href
		},
		success: function(d){
			if(d.success){
				initWeChatJS(d.data);
			} else {
				console.log(d);
			}
		}
	});
});

function initWeChatJS(params){
	wx.config({
	    // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	    appId: params.appId, // 必填，公众号的唯一标识
	    timestamp: params.timestamp, // 必填，生成签名的时间戳
	    nonceStr: params.nonceStr, // 必填，生成签名的随机串
	    signature: params.signature,// 必填，签名，见附录1
	    jsApiList: [
	    	'onMenuShareTimeline',
	        'onMenuShareAppMessage',
	        'onMenuShareQQ',
	        'onMenuShareWeibo'
	        // 'getNetworkType'
	    ]
	});

	var share_title = 'Moncler盟可睐锦绣新春',
		share_desc = '您有一份来自Moncler盟可睐的尊贵新春贺礼。',
		share_link = window.location.href,
		share_img = config.basePath + '/img/share_kv.jpg';
		// or TBC placeholder '/new-modern/assets/img/placeholder.jpg'

	wx.ready(function(){
		// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
		wx.onMenuShareAppMessage({
			title: share_title,
			desc: share_desc,
			link: share_link,
			imgUrl: share_img,
			trigger: function (res) {
				// alert('用户点击发送给朋友');
			},
			success: function (res) {
				// alert('已分享');
			},
			cancel: function (res) {
				// alert('已取消');
			},
			fail: function (res) {
				// alert(JSON.stringify(res));
			}
		});

		// 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
		wx.onMenuShareTimeline({
			title: share_title,
			desc: share_desc,
			link: share_link,
			imgUrl: share_img,
			trigger: function (res) {
				// alert('用户点击分享到朋友圈');
			},
			success: function (res) {
				// alert('已分享');
			},
			cancel: function (res) {
				// alert('已取消');
			},
			fail: function (res) {
				// alert(JSON.stringify(res));
			}
		});

		// 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
		wx.onMenuShareQQ({
			title: share_title,
			desc: share_desc,
			link: share_link,
			imgUrl: share_img,
			trigger: function (res) {
				// alert('用户点击分享到QQ');
			},
			complete: function (res) {
				// alert(JSON.stringify(res));
			},
			success: function (res) {
				// alert('已分享');
			},
			cancel: function (res) {
				// alert('已取消');
			},
			fail: function (res) {
				// alert(JSON.stringify(res));
			}
		});

		// 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
		wx.onMenuShareWeibo({
			title: share_title,
			desc: share_desc,
			link: share_link,
			imgUrl: share_img,
			trigger: function (res) {
				// alert('用户点击分享到微博');
			},
			complete: function (res) {
				// alert(JSON.stringify(res));
			},
			success: function (res) {
				// alert('已分享');
			},
			cancel: function (res) {
				// alert('已取消');
			},
			fail: function (res) {
				// alert(JSON.stringify(res));
			}
		});
	});
}
