let navObjs;
let main;
let contentWindow;
let screensaver;
let ctx;
const mod = 1|0;

function toggleWindow(active = true) {
	if (active) {
		contentWindow.classList.remove("inactive");
		contentWindow.classList.add("active");
		main.classList.add("active-window");
	} else {
		contentWindow.classList.remove("active");
		contentWindow.classList.add("inactive");
		main.classList.remove("active-window");
	}
}

function updateContent(content) {
	const contentTarget = document.querySelector(".content");
	contentTarget.innerHTML = content;
	toggleWindow(true);
	
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
	toggleWindow(false);
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
	
	const bigSpd = 0.2;
	const bigW = 1 / 35;
	const bigH = 40;
	
	const smallSpd = 1;
	const smallW = 1 / 1000;
	const smallH = 60;
	let y = h * 0.7 + Math.sin((d * smallSpd) * smallW) * smallH;
	
	ctx.moveTo(0, y);
	
	for (let x = 0; x < w * 0.8; x += 8) {
		let waveH = Math.sin((x + d * bigSpd) * bigW) * bigH;
		waveH -= Math.sin(x / (w * 0.775) * Math.PI) * 50;
		// waveH += Math.sin((x + d * smallSpd) * smallW) * smallH;
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
	main = document.querySelector("main")
	navObjs = Array.from(document.querySelectorAll("#nav ul"));
	navObjs.forEach(nav => nav.onclick = () => fetchContent(nav));
	
	document.querySelector(".exit").addEventListener("click", () => closeWindow());
	
	initCanvas();
}

window.addEventListener('load', () => init());

