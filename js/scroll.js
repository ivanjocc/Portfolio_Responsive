document.addEventListener('DOMContentLoaded', function () {
	var navLinks = document.querySelectorAll('.navbar-nav a');

	for (var i = 0; i < navLinks.length; i++) {
		navLinks[i].addEventListener('click', smoothScroll);
	}

	function smoothScroll(e) {
		e.preventDefault();
		var targetId = this.getAttribute('href').substring(1);
		var targetElement = document.getElementById(targetId);
		var targetPosition = targetElement.offsetTop;
		var startPosition = window.pageYOffset;
		var distance = targetPosition - startPosition - getNavbarHeight();
		var duration = 800;
		var start = null;

		function step(timestamp) {
			if (!start) start = timestamp;
			var progress = timestamp - start;
			var easeInOutQuad = easeInOut(progress, startPosition, distance, duration);
			window.scrollTo(0, easeInOutQuad);
			if (progress < duration) {
				window.requestAnimationFrame(step);
			}
		}

		window.requestAnimationFrame(step);
	}

	function easeInOut(t, b, c, d) {
		t /= d / 2;
		if (t < 1) return c / 2 * t * t + b;
		t--;
		return -c / 2 * (t * (t - 2) - 1) + b;
	}

	function getNavbarHeight() {
		var navbar = document.querySelector('.navbar');
		return navbar.offsetHeight;
	}
});
