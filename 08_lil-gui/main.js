import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

// create a scene
const scene = new THREE.Scene();

// create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

// create and add sphere object
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

//create texture
const loader = new THREE.TextureLoader();
const texture = loader.load('./text/color.jpg');
const roughness = loader.load('./text/roughness.jpg');
const normal = loader.load('./text/normal.jpg');
const height= loader.load('./text/height.jpg');

material.map = texture;
material.roughnessMap = roughness;
material.normalMap = normal;
material.displacementMap = height;

//create lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0,1,0);
light.castShadow = true;
scene.add(light);

// Add additional directional light
const additionalLight = new THREE.DirectionalLight(0xffa500, 0.5);
additionalLight.position.set(-1, -1, 1);
scene.add(additionalLight);

const intenseLight = new THREE.DirectionalLight(0xffffff, 5);
intenseLight.position.set(2, 2, 2);
scene.add(intenseLight);

//light helpers
const lightHelper = new THREE.DirectionalLightHelper(light, 0.5);
scene.add(lightHelper);

const additionalLightHelper = new THREE.DirectionalLightHelper(additionalLight, 0.5);
scene.add(additionalLightHelper);

const intenseLightHelper = new THREE.DirectionalLightHelper(intenseLight, 0.5);
scene.add(intenseLightHelper);

// create renderer
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);


//orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotateSpeed = 5;
// controls.autoRotate = true;
// controls.enableZoom=false;
controls.dampingFactor = 0.01;


//animate the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}

animate();


// handle window resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  controls.update();
})


//gui
import * as lil from 'lil-gui';
const gui = new lil.GUI();
const materialFolder = gui.addFolder('Material');
materialFolder.add(material, 'metalness', 0, 1).step(0.01).name('metalness');
materialFolder.add(material, 'roughness', 0, 1).step(0.01).name('roughness');
materialFolder.open();
materialFolder.addColor(material, 'color').name('color');
materialFolder.add(material, 'displacementScale', 0, 1).step(0.01).name('displacement scale');

const meshFolder = gui.addFolder('Mesh');
meshFolder.add(sphere.scale, 'x', 0, 5).step(0.01).name('scale x');
meshFolder.add(sphere.scale, 'y', 0, 5).step(0.01).name('scale y');
meshFolder.add(sphere.scale, 'z', 0, 5).step(0.01).name('scale z');
meshFolder.add(sphere.position, 'x', -5, 5).step(0.01).name('position x');
meshFolder.add(sphere.position, 'y', -5, 5).step(0.01).name('position y');
meshFolder.add(sphere.position, 'z', -5, 5).step(0.01).name('position z');
meshFolder.add(sphere.rotation, 'x', 0, Math.PI * 2).step(0.01).name('rotation x');
meshFolder.add(sphere.rotation, 'y', 0, Math.PI * 2).step(0.01).name('rotation y');
meshFolder.add(sphere.rotation, 'z', 0, Math.PI * 2).step(0.01).name('rotation z');
meshFolder.open();
