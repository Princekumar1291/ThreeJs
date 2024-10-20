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
// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 2); // soft white light
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

//add point light
const pointLight = new THREE.PointLight(0xffffff, 5, 0);
pointLight.position.set(1, 1, 1);
scene.add(pointLight);

//light helpers
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, .5);
scene.add(directionalLightHelper);

//point light helper
const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(pointLightHelper);



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
materialFolder.close();
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
meshFolder.close();


const lightFolder = gui.addFolder('Light');
const ambientFolder = lightFolder.addFolder('Ambient');
ambientFolder.add(ambientLight, 'intensity', 0, 10).step(0.01).name('intensity');
ambientFolder.addColor(ambientLight, 'color').name('color');

const directionalFolder = lightFolder.addFolder('Directional');
directionalFolder.add(directionalLight.position, 'x', -5, 5).step(0.01).name('position x');
directionalFolder.add(directionalLight.position, 'y', -5, 5).step(0.01).name('position y');
directionalFolder.add(directionalLight.position, 'z', -5, 5).step(0.01).name('position z');
directionalFolder.add(directionalLight, 'intensity', 0, 10).step(0.01).name('intensity');
directionalFolder.addColor(directionalLight, 'color').name('color');

const pointFolder = lightFolder.addFolder('Point');
pointFolder.add(pointLight.position, 'x', -5, 5).step(0.01).name('position x');
pointFolder.add(pointLight.position, 'y', -5, 5).step(0.01).name('position y');
pointFolder.add(pointLight.position, 'z', -5, 5).step(0.01).name('position z');
pointFolder.add(pointLight, 'intensity', 0, 10).step(0.01).name('intensity');
pointFolder.addColor(pointLight, 'color').name('color');
lightFolder.close();
