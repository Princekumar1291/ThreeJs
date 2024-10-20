import * as THREE from 'three';

// create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#F0F0F0');

// create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// create and add cube object(mesh)
const geometry = new THREE.BoxGeometry(1,2,1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const cube = new THREE.Mesh(geometry, material);
// cube.position.y = -2;
// cube.position.x = -2;
// cube.position.z =0;

// cube.rotation.x =Math.PI/4;
// cube.rotation.y =Math.PI/4;
// cube.rotation.z =Math.PI;

// cube.scale.x = 2;
// cube.scale.y = 2;
// cube.scale.z = 2;
scene.add(cube);


//create lighting
const light= new THREE.DirectionalLight(0x9CDBA6, 10);
light.position.set(1, 1, 1);
scene.add(light);

// create renderer
const box = document.getElementById('box');
const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(box.clientWidth, box.clientHeight);
box.appendChild(renderer.domElement);

//animate the scene
let clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x = clock.getElapsedTime()*2;
  cube.rotation.y = clock.getElapsedTime()*2;
  // cube.rotation.y += 0.01;
  // cube.rotation.x += 0.01;
  renderer.render(scene, camera);
}

animate();