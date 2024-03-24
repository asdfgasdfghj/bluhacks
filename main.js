import * as THREE from "https://unpkg.com/three@v0.159.0/build/three.module.js";
import { OrbitControls } from 'https://unpkg.com/three@v0.159.0/examples/jsm/controls/OrbitControls.js';

// function changeTheme(background, foreground) {
//     let root = document.querySelector(":root");
//     root.style.setProperty("--background-color", background);
//     root.style.setProperty("--foreground-color", foreground);
// }

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerWidth);
renderer.antialias = true;
renderer.outputEncoding = THREE.sRGBEncoding;
document.getElementById("cont").appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// const loader = new THREE.CubeTextureLoader();
// loader.setPath("textures/");


// const textureCube = loader.load([
//     "sky_rt0001.png", "sky_lf0001.png",
//     "sky_up0001.png", "sky_dn0001.png",
//     "sky_bk0001.png", "sky_ft0001.png"
// ]);

scene.background = textureCube;
scene.add(camera);
camera.position.set(0, 2, 0);

// const groundGeometry = new THREE.PlaneGeometry(250, 250);
// const groundMaterial = new THREE.MeshPhongMaterial({ side: THREE.BackSide });
// const ground = new THREE.Mesh(groundGeometry, groundMaterial);
// ground.rotation.set(Math.PI/2, 0, Math.PI);

scene.background.minFilter = scene.background.magFilter = THREE.NearestFilter;
const ambient = new THREE.AmbientLight(0xe0f6ff);
const directional = new THREE.DirectionalLight(0xd6cec5, 3.5);
directional.castShadow = true;
scene.add(ambient);
scene.add(directional);

scene.add(ground);

const barFill = new THREE.MeshPhongMaterial({ color: 0xffffff })
const barBackground = new THREE.MeshBasicMaterial({ color: 0x333333, transparent: true, transparency: 0.5 })

function createDataBar(position, percentage, height = 5) {
    const background = THREE.Mesh(THREE.BoxGeometry(0.99, height, 0.99), barBackground);
    background.position = position;
    background.position.add(0, height / 2, 0);
    alert(JSON.stringify(background.position))
    scene.add(background);

    const fill = THREE.Mesh(THREE.BoxGeometry(1, height * percentage, 1), barFill);
    fill.position = position;
    fill.position.add(0, height * percentage / 2, 0);
    scene.add(fill);
}

createDataBar(THREE.Vector3(0, 0, 5), .5)

function animate() {
	requestAnimationFrame(animate);

    update();

	renderer.render(scene, camera);
}

animate();

function update() {
    // Runs every frame
    //
}