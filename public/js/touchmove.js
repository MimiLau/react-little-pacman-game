$(document).ready(function () {
	function stopScrolling(touchEvent) {
		touchEvent.preventDefault();
	}

	document.addEventListener('touchstart', stopScrolling, false);
	document.addEventListener('touchmove', stopScrolling, false);
});
