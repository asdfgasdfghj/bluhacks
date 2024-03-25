import * as THREE from "https://unpkg.com/three@0.159.0/build/three.module.js";

// function changeTheme(background, foreground) {
//     let root = document.querySelector(":root");
//     root.style.setProperty("--background-color", background);
//     root.style.setProperty("--foreground-color", foreground);
// }

let data = {
    "default": "Hover over graph for more information...",
    "1": "<span class='highlighted'>&nbsp;50% </span>&nbsp;&nbsp;with mental disorder suffer alcohol or drug abuse",
    "2": "<span class='highlighted'>&nbsp;53% </span>&nbsp;&nbsp;of drug abusers have mental illness",
    "3": "<span class='highlighted'>&nbsp;29% </span>&nbsp;&nbsp;of people diagnosed as mentally ill abuse alcohol or drugs"
}

let bars = {}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerWidth);
renderer.antialias = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setClearColor(0x000000, 0);
document.getElementById("cont").appendChild(renderer.domElement);

// const loader = new THREE.CubeTextureLoader();
// loader.setPath("textures/");


// const textureCube = loader.load([
//     "sky_rt0001.png", "sky_lf0001.png",
//     "sky_up0001.png", "sky_dn0001.png",
//     "sky_bk0001.png", "sky_ft0001.png"
// ]);

// scene.background = textureCube;
scene.add(camera);
camera.position.set(0, 6, 5);
camera.rotation.set(-.15, 0, 0)

// const groundGeometry = new THREE.PlaneGeometry(250, 250);
// const groundMaterial = new THREE.MeshPhongMaterial({ side: THREE.BackSide });
// const ground = new THREE.Mesh(groundGeometry, groundMaterial);
// ground.rotation.set(Math.PI/2, 0, Math.PI);

const ambient = new THREE.AmbientLight(0xe0f6ff);
const directional = new THREE.DirectionalLight(0xd6cec5, 3.5);
directional.castShadow = true;
const target = new THREE.Object3D();
target.position.set(-.5, 0, -.8);
scene.add(target);
scene.add(ambient);
scene.add(directional);

directional.target = target

// scene.add(ground);

const barFill = new THREE.MeshPhongMaterial({ color: 0xffffff });
const barFillHover = new THREE.MeshNormalMaterial();
const barBackground = new THREE.MeshPhongMaterial({ color: 0x888888, transparent: true, opacity: 0.5 });

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

window.addEventListener("pointermove", onPointerMove);
function onPointerMove(event) {
    var rect = event.target.getBoundingClientRect();
    
	pointer.x = ((event.clientX - rect.left) / 400) * 2 - 1;
	pointer.y = -((event.clientY - rect.top) / 400) * 2 + 1;
}

function createDataBar(position, percentage, name, s = 2, height = 5) {
    // alert(JSON.stringify(position))
    const background = new THREE.Mesh(new THREE.BoxGeometry(s - 0.001, height, s - 0.001), barBackground);
    background.position.set(position.x, position.y + height / 2, position.z);
    // alert(JSON.stringify(background.position))
    background.name = name;
    scene.add(background);

    const fill = new THREE.Mesh(new THREE.BoxGeometry(s, height * percentage, s), barFill);
    fill.position.set(position.x, position.y + height * percentage / 2, position.z);
    fill.name = name;
    scene.add(fill);

    bars[name] = fill;
}

function substance() {
    createDataBar(new THREE.Vector3(0, 2, -5), .5, "1");
    createDataBar(new THREE.Vector3(-2.5, 2, -5), .53, "2");
    createDataBar(new THREE.Vector3(2.5, 2, -5), .29, "3");
}
function suicide() {
    const max = 20;
    data = [10.9, 10.8, 11, 10.9, 11, 11.3, 11.6, 11.8, 12.1, 12.3, 12.6, 12.6, 13, 13.3, 13.5, 14, 14.2, 13.9, 13.5, 14.1, 14.3]

    for (let i = 0; i < data.length; i++) {
        const position = (-data.length/2 * .75) + i * .75;
        createDataBar(new THREE.Vector3(position+.5, .75, -15), data[i] / max, `s${i}`, .55, 9);
        data[`s${i}`] = `In ${2002 + i}, the U. S. suicide rate was <span class="highlighted">&nbsp;${data[i]}&nbsp;</span>`
    }
}


const pages = {
    "/substanceabuse.html": substance,
    "/demographics.html": () => {},
    "/suicide.html": suicide
}
// pages
// substance();
// alert(window.location.pathname)
pages[window.location.pathname]()

const clock = new THREE.Clock(true);
let elapsed = 0;

function animate() {
	requestAnimationFrame(animate);

    update(clock.getDelta());

	renderer.render(scene, camera);
}

animate();

function update(delta) {
    raycaster.setFromCamera(pointer, camera);
    elapsed += delta;
    // Runs every frame
    camera.position.set(0, 6 + Math.sin(elapsed) * 0.15, 5);

    const intersects = raycaster.intersectObjects(scene.children);
    const info = document.querySelector("#info");

    for (const key of Object.keys(bars)) {
        bars[key].material = barFill;
    }

    if (intersects.length > 0 && intersects[0].object.name in data) {
        const key = intersects[0].object.name;
        info.innerHTML = data[key];
        bars[key].material = barFillHover;
    }
    else {
        info.innerHTML = "Hover over graph for more information...";
    }
}