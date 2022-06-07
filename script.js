let navObjs;

function updateContent(content) {
	const contentTarget = document.querySelector(".content");
	contentTarget.innerHTML = content;
}

function fetchContent(node) {
	for (let nav of navObjs) {
		nav.classList.remove("active");
	}
	node.classList.add("active")
	const page = node.getAttribute('target');
	fetch(`content/${page}.html`)
	.then(response => response.text())
	.then(content => updateContent(content))
}

function init() {
	navObjs = document.querySelectorAll("#nav ul");
	for (let nav of navObjs) {
		nav.addEventListener('click', () => fetchContent(nav));
	}
	
	fetchContent(navObjs[0]);
}

window.addEventListener('load', () => init());
