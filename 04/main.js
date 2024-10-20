import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#F0F0F0');

// create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

// create and add cube object
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// create the edges for the "border"
const edges = new THREE.EdgesGeometry(geometry);
const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 }); 
const edgeLines = new THREE.LineSegments(edges, edgeMaterial); 
scene.add(edgeLines); 

//create lighting
const light= new THREE.DirectionalLight(0x9CDBA6, 10);
light.position.set(1, 1, 1);
scene.add(light);

// create renderer
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);


//orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotateSpeed = 5;
// controls.autoRotate = true;
controls.enableZoom=false;
controls.dampingFactor = 0.01;



//animate the scene
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.005;
  cube.rotation.y += 0.005;
  edgeLines.rotation.x += 0.005;
  edgeLines.rotation.y += 0.005;
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

