import * as THREE from 'three';

// create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#F0F0F0');

// create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// create and add cube object
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//create lighting
const light= new THREE.DirectionalLight(0x9CDBA6, 10);
light.position.set(1, 1, 1);
scene.add(light);

// create renderer
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

//animate the scene
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();