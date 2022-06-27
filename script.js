let navObjs;
let contentWindow;

function updateContent(content) {
	const contentTarget = document.querySelector(".content");
	contentTarget.innerHTML = content;
	contentWindow.classList.remove("inactive");
	contentWindow.classList.add("active");
}

function fetchContent(node) {
	for (let nav of navObjs) {
		nav.classList.remove("current");
	}
	node.classList.add("current")
	const page = node.getAttribute('target');
	fetch(`content/${page}.html`)
	.then(response => response.text())
	.then(content => updateContent(content))
}

function closeWindow() {
	document.querySelector(".current").classList.remove("current");
	contentWindow.classList.remove("active");
	contentWindow.classList.add("inactive");
}

function init() {
	contentWindow = document.querySelector(".window");
	navObjs = document.querySelectorAll("#nav ul");
	for (let nav of navObjs) {
		nav.addEventListener('click', () => fetchContent(nav));
	}
	
	document.querySelector(".exit").addEventListener("click", () => closeWindow());
}

window.addEventListener('load', () => init());

