import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import * as dat from "dat.gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

console.log(dat);

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0xf5dfb7, 1.2);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
scene.add(directionalLight);
directionalLight.castShadow = true;
console.log(directionalLight.shadow);
// ambientLight.castShadow = true;

//Color Changer
const gui = new dat.GUI();
const parameters = {
  rug: 0xb3b3b3,
  couch: 0xd7c974,
  cushions: 0xd9d3cf,
  pillows: 0xf0912d,
};

//textures
const textureLoader = new THREE.TextureLoader();

const decorativeTexture = textureLoader.load("/textures/texture22.jpg");
const decorativeNormal = textureLoader.load("/textures/fabricnormal2.jpg");
const decorativeMaterial = new THREE.MeshPhysicalMaterial({
  color: parameters.pillows,
  map: decorativeTexture,
  normalMap: decorativeNormal,
});

const couchTexture = textureLoader.load("/textures/wood.jpg");
const couchNormal = textureLoader.load("/textures/woodmaplenormal.jpg");
const couchMaterial = new THREE.MeshPhysicalMaterial({
  color: parameters.couch,
  map: couchTexture,
  normalMap: couchNormal,
});

const cushionTexture = textureLoader.load("/textures/fabric.jpg");
const cushionNormal = textureLoader.load("/textures/fabricnormal.jpg");
const cushionMaterial = new THREE.MeshPhysicalMaterial({
  color: parameters.cushions,
  map: cushionTexture,
  normalMap: cushionNormal,
});

//textureRug
const rugTexture = textureLoader.load("/textures/fabric.jpg");
const rugNormal = textureLoader.load("/textures/texturenormal.jpg");
const rugMaterial = new THREE.MeshPhysicalMaterial({
  color: parameters.rug,
  map: rugTexture,
  normalMap: rugNormal,
});

// Draco loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("draco/");

//Loading Manager

const progressBar = document.getElementById("progress-bar");

const loadingManager = new THREE.LoadingManager();
loadingManager.onProgress = function (url, loaded, total) {
  console.log(`start: ${url}`);
  progressBar.value = (loaded / total) * 100;
};

const progressBarContainer = document.querySelector(".progress-bar-container");

loadingManager.onLoad = function () {
  console.log(`just finished`);
  progressBarContainer.style.display = "none";
};

// GLTF loader
const gltfLoader = new GLTFLoader(loadingManager);
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load("colorchangerroom2.glb", (gltf) => {
  gltf.scene.position.y = -1.3;
  gltf.scene.position.x = 6.0;
  gltf.scene.position.z = 0.1;
  scene.add(gltf.scene);
  console.log(gltf.scene);

  console.log("loaded");

  const rug = gltf.scene.children.find((child) => child.name === "Plane006");
  rug.material = rugMaterial;

  //empty objects
  const empty = gltf.scene.children.find((child) => child.name === "Empty");
  console.log(empty);

  const couchBase1 = empty.children.find((child) => child.name === "Cube001");
  couchBase1.material = couchMaterial;
  const couchBase2 = empty.children.find((child) => child.name === "Cube013");
  couchBase2.material = couchMaterial;
  const couchBase3 = empty.children.find((child) => child.name === "Cube016");
  couchBase3.material = couchMaterial;
  const couchBase4 = empty.children.find((child) => child.name === "Cube017");
  couchBase4.material = couchMaterial;

  //cushions
  const cushion1 = empty.children.find((child) => child.name === "Cube012");
  cushion1.material = cushionMaterial;
  const cushion2 = empty.children.find((child) => child.name === "Cube015");
  cushion2.material = cushionMaterial;
  const cushion3 = empty.children.find((child) => child.name === "Cube019");
  cushion3.material = cushionMaterial;
  const cushion4 = empty.children.find((child) => child.name === "Cube003");
  cushion4.material = cushionMaterial;
  const cushion5 = empty.children.find((child) => child.name === "Cube004");
  cushion5.material = cushionMaterial;
  const cushion6 = empty.children.find((child) => child.name === "Cube002");
  cushion6.material = cushionMaterial;
  const cushion7 = empty.children.find((child) => child.name === "Cube052");
  cushion7.material = cushionMaterial;

  //small pillows
  const pillow1 = empty.children.find((child) => child.name === "Cube005");
  pillow1.material = decorativeMaterial;
  const pillow2 = empty.children.find((child) => child.name === "Cube055");
  pillow2.material = decorativeMaterial;
  const pillow3 = empty.children.find((child) => child.name === "Cube054");
  pillow3.material = decorativeMaterial;

  //big pillows
  const pillowB1 = empty.children.find((child) => child.name === "Cube018");
  pillowB1.material = cushionMaterial;
  const pillowB2 = empty.children.find((child) => child.name === "Cube020");
  pillowB2.material = cushionMaterial;
  const pillowB3 = empty.children.find((child) => child.name === "Cube007");
  pillowB3.material = cushionMaterial;
  const pillowB4 = empty.children.find((child) => child.name === "Cube008");
  pillowB4.material = cushionMaterial;
  const pillowB5 = empty.children.find((child) => child.name === "Cube009");
  pillowB5.material = cushionMaterial;
  const pillowB6 = empty.children.find((child) => child.name === "Cube011");
  pillowB6.material = cushionMaterial;
  const pillowB7 = empty.children.find((child) => child.name === "Cube010");
  pillowB7.material = cushionMaterial;
});

//Color Changer Add

gui.addColor(parameters, "rug").onChange(() => {
  rugMaterial.color.set(parameters.rug);
});

gui.addColor(parameters, "couch").onChange(() => {
  couchMaterial.color.set(parameters.couch);
});

gui.addColor(parameters, "cushions").onChange(() => {
  cushionMaterial.color.set(parameters.cushions);
});

gui.addColor(parameters, "pillows").onChange(() => {
  decorativeMaterial.color.set(parameters.pillows);
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 1.15;
camera.position.y = 1.15;
camera.position.x = -1.75;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.minDistance = 0;
controls.maxDistance = 3.9;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
