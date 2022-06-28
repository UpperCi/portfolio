let navObjs;
let contentWindow;
let screensaver;
let ctx;
const mod = 1|0;

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
	
	const bottom = document.createElement("div");
	bottom.classList.add("bottom");
	contentTarget.appendChild(bottom);
	
	initTech();
}

const TECH_DATA = {
	"mysql" : {
		"icon": "mysql.svg",
		"text": "MySQL"
	},
	"mongodb" : {
		"icon": "mongodb.svg",
		"text": "MongoDB"
	},
	"nodejs" : {
		"icon": "nodejs.svg",
		"text": "NodeJS"
	},
	"js" : {
		"icon": "js.svg",
		"text": "JavaScript"
	},
	"py" : {
		"icon": "python.svg",
		"text": "Python"
	},
	"sass" : {
		"icon": "sass.svg",
		"text": "Sass"
	},
	"react" : {
		"icon": "react.svg",
		"text": "React"
	},
	"ml" : {
		"icon": "ai.svg",
		"text": "Machine Learning"
	},
}

function fetchSvg(node, data) {
	fetch(`icons/${data.icon}`)
	.then(response => response.text())
	.then(content => {
		node.innerHTML = content;
		const txt = document.createElement('p');
		txt.innerText = data.text;
		// node.appendChild(txt);
	});
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

function loopCanvas(ms) {
	const box = document.querySelector("main").getBoundingClientRect();
	screensaver.width = box.width * mod;
	screensaver.height = box.height * mod;
	let w = screensaver.width;
	let h = screensaver.height;
	let d = Math.round(ms);
	// console.log(ctx)
	ctx.fillStyle = "#00D158";
	// console.log(w, h)
	ctx.fillRect(0, 0, w, h);
	ctx.fillStyle = "#2E2A28";
	ctx.beginPath();
	let y = h * 0.75;
	ctx.moveTo(0, y);
	
	const bigSpd = 0.2;
	const bigW = 1 / 35;
	const bigH = 40;
	
	const smallSpd = 1.55;
	const smallW = 1 / 500;
	const smallH = 40;
	
	for (let x = 0; x < w + 100; x += 20) {
		let waveH = Math.sin((x + d * bigSpd) * bigW) * bigH;
		waveH += Math.sin((x + d * smallSpd) * smallW) * smallH;
		ctx.lineTo(x, y - waveH);
	}
	ctx.lineTo(w, h);
	ctx.lineTo(0, h);
	// ctx.stroke();
	ctx.fill();
	
	requestAnimationFrame((ms) => loopCanvas(ms));
}

function initCanvas() {
	screensaver = document.querySelector("canvas");
	const box = document.querySelector("main").getBoundingClientRect();
	screensaver.width = box.width * mod;
	screensaver.height = box.height * mod;
	ctx = screensaver.getContext("2d");
	
	requestAnimationFrame((ms) => loopCanvas(ms));
}

function init() {
	contentWindow = document.querySelector(".window");
	navObjs = Array.from(document.querySelectorAll("#nav ul"));
	navObjs.forEach(nav => nav.onclick = () => fetchContent(nav));
	
	document.querySelector(".exit").addEventListener("click", () => closeWindow());
	
	initCanvas();
}

window.addEventListener('load', () => init());

