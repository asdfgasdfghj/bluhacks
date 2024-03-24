import * as THREE from "three";

// function changeTheme(background, foreground) {
//     let root = document.querySelector(":root");
//     root.style.setProperty("--background-color", background);
//     root.style.setProperty("--foreground-color", foreground);
// }

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new THREE.CubeTextureLoader();
loader.setPath("textures/");


const textureCube = loader.load([
    "sky_rt0001.bmp", "sky_lf0001.bmp",
    "sky_up0001.bmp", "sky_dn0001.bmp",
    "sky_bk0001.bmp", "sky_ft0001.bmp"
]);

scene.background = textureCube;
scene.add(camera);