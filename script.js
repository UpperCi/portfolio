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
	
	initTech();
}

const TECH_DATA = {
	"mysql" : {
		"icon": "mysql.svg",
		"text": "MySQL"
	},
	"mongodb" : {
		"icon": "mongodb.svg"
		"text": "MongoDB"
	},
	"nodejs" : {
		"icon": "nodejs.svg"
		"text": "NodeJS"
	},
	"js" : {
		"icon": "js.svg"
		"text": "JavaScript"
	},
	"py" : {
		"icon": "python.svg"
		"text": "Python"
	},
	"sass" : {
		"icon": "sass.svg"
		"text": "Sass"
	},
	"react" : {
		"icon": "react.svg"
		"text": "React"
	},
	"ml" : {
		"icon": "ai.svg"
		"text": "Machine Learning"
	},
}

function fetchSvg(node, data) {
	fetch(`icons/${data.icon}`)
	.then(response => response.text())
	.then(content => node.innerHTML = content);
}

function initTech() {
	const techDiv = Array.from(document.querySelectorAll(".tech-icons div"));
	
	for (let div of techDiv) {
		const divTech = div.getAttribute("tech");
		if (!(divTech in TECH_DATA)) continue;
		const techData = TECH_DATA[divTech];
		fetchSvg(div, techData);
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

