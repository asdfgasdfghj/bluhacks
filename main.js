import * as THREE from "https://unpkg.com/three@0.159.0/build/three.module.js";

// function changeTheme(background, foreground) {
//     let root = document.querySelector(":root");
//     root.style.setProperty("--background-color", background);
//     root.style.setProperty("--foreground-color", foreground);
// }

const data = {
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
camera.rotation.set(-3.14/8, 0, 0)

// const groundGeometry = new THREE.PlaneGeometry(250, 250);
// const groundMaterial = new THREE.MeshPhongMaterial({ side: THREE.BackSide });
// const ground = new THREE.Mesh(groundGeometry, groundMaterial);
// ground.rotation.set(Math.PI/2, 0, Math.PI);

const ambient = new THREE.AmbientLight(0xe0f6ff);
const directional = new THREE.DirectionalLight(0xd6cec5, 3.5);
directional.castShadow = true;
scene.add(ambient);
scene.add(directional);

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

function createDataBar(position, percentage, name, height = 5) {
    // alert(JSON.stringify(position))
    const background = new THREE.Mesh(new THREE.BoxGeometry(1.999, height, 1.999), barBackground);
    background.position.set(position.x, position.y + height / 2, position.z);
    // alert(JSON.stringify(background.position))
    background.name = name;
    scene.add(background);

    const fill = new THREE.Mesh(new THREE.BoxGeometry(2, height * percentage, 2), barFill);
    fill.position.set(position.x, position.y + height * percentage / 2, position.z);
    fill.name = name;
    scene.add(fill);

    bars[name] = fill;
}

createDataBar(new THREE.Vector3(0, 0, -5), .5, "1")
createDataBar(new THREE.Vector3(-2.5, 0, -5), .53, "2")
createDataBar(new THREE.Vector3(2.5, 0, -5), .29, "3")

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
        info.innerHTML = data.default;
    }
}