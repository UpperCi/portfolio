let navObjs;
let contentWindow;

function updateContent(content) {
	const contentTarget = document.querySelector(".content");
	contentTarget.innerHTML = content;
	contentWindow.classList.remove("inactive");
	contentWindow.classList.add("active");
	
	const projectThumbnails = document.querySelectorAll(".project-view-button");
	for (let thumb of projectThumbnails) {
		const target = thumb.getAttribute('target');
		const nav = navObjs.find(el => el.getAttribute('target') == target);
		thumb.onclick = () => nav.click();
		thumb.onmouseenter = () => nav.firstElementChild.focus();
		thumb.onmouseleave = () => nav.firstElementChild.blur();
	}
}

function fetchContent(node) {
	navObjs.forEach(nav => nav.classList.remove("current"));
	node.classList.add("current");
	const page = node.getAttribute('target');
	fetch(`content/${page}.html`)
	.then(response => response.text())
	.then(content => updateContent(content));
}

function closeWindow() {
	navObjs.forEach(nav => nav.classList.remove("current"));
	contentWindow.classList.remove("active");
	contentWindow.classList.add("inactive");
}

function init() {
	contentWindow = document.querySelector(".window");
	navObjs = Array.from(document.querySelectorAll("#nav ul"));
	navObjs.forEach(nav => nav.onclick = () => fetchContent(nav));
	
	document.querySelector(".exit").addEventListener("click", () => closeWindow());
}

window.addEventListener('load', () => init());

