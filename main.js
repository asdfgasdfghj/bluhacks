import * as THREE from "https://unpkg.com/three@v0.159.0/build/three.module.js";

// function changeTheme(background, foreground) {
//     let root = document.querySelector(":root");
//     root.style.setProperty("--background-color", background);
//     root.style.setProperty("--foreground-color", foreground);
// }

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.antialias = true;
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

const loader = new THREE.CubeTextureLoader();
loader.setPath("textures/");


const textureCube = loader.load([
    "sky_rt0001.png", "sky_lf0001.png",
    "sky_up0001.png", "sky_dn0001.png",
    "sky_bk0001.png", "sky_ft0001.png"
]);

scene.background = textureCube;
scene.add(camera);
camera.position.set(0, 2, 0);

const groundGeometry = new THREE.PlaneGeometry(250, 250);
const groundMaterial = new THREE.MeshPhongMaterial({ side: THREE.BackSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.set(Math.PI/2, 0, Math.PI);

scene.background.minFilter = scene.background.magFilter = THREE.NearestFilter;
const ambient = new THREE.AmbientLight(0xe0f6ff);
const directional = new THREE.DirectionalLight(0xd6cec5, 3.5);
directional.castShadow = true;
scene.add(ambient);
scene.add(directional);

scene.add(ground);

function animate() {
	requestAnimationFrame(animate);

    update();

	renderer.render(scene, camera);
}

animate();

function update() {
    // Runs every frame
}