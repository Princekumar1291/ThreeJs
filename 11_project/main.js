//add orbit controls
//add gltf loader or glb model
//add rgba hdri
//add post processing rgb shift
//add resize event listener
//add mouse hover event
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 3.5;

// Renderer
const renderer = new THREE.WebGLRenderer({ 
  canvas: document.querySelector('#canvas') ,
  antialias: true,  
  alpha: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1)); // to get better performance on high pixel ratio displays
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;

// Post-processing
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const rgbShiftPass = new ShaderPass(RGBShiftShader);
rgbShiftPass.uniforms['amount'].value = 0.0025;
composer.addPass(rgbShiftPass);

// Orbit Controls
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.05;
// controls.enableZoom = false;

let model; // Declare model variable to store the loaded 3D model

// HDRI Loader
new RGBELoader()
  .setDataType(THREE.HalfFloatType)  // Use half float type for better performance
  .load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/pond_bridge_night_1k.hdr', function(texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    // scene.background = texture;
    scene.environment = texture;

    // GLTF Loader
    const loader = new GLTFLoader();
    loader.load(
      '/DamagedHelmet.gltf',
      function (gltf) {
        model = gltf.scene;
        scene.add(model);
        
        // Adjust the model's position, scale, and rotation to make it front-facing
        model.position.set(0, 0, 0);
        updateModelScale(); // Initial scale update
        model.rotation.y = 0; // Set rotation to 0 to make it front-facing
      },
      undefined,
      function (error) {
        console.error('An error happened', error);
      }
    );

    // Start animation loop
    renderer.setAnimationLoop(animate);
  });

// Render
composer.render();

// Animation
function animate() {
  if (model) {
    // Update model rotation based on mouse position
    const targetRotationX = (mouseY - 0.5) * Math.PI * 0.5;
    const targetRotationY = (mouseX - 0.5) * Math.PI * 0.5;

    // Smoothly interpolate current rotation to target rotation
    model.rotation.x += (targetRotationX - model.rotation.x) * 0.004;
    model.rotation.y += (targetRotationY - model.rotation.y) * 0.004;
  }
  composer.render();
}

// Handle window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
  updateModelScale(); // Update model scale on resize
}

// Add mouse move event
let mouseX = 0.5, mouseY = 0.5;
window.addEventListener('mousemove', onMouseMove, false);

function onMouseMove(event) {
  mouseX = event.clientX / window.innerWidth;
  mouseY = event.clientY / window.innerHeight;
}

// Function to update model scale based on window size
function updateModelScale() {
  if (model) {
    const minDimension = Math.min(window.innerWidth, window.innerHeight);
    const baseScale = 1; // Base scale for a reference size (e.g., 1000px)
    const scaleFactor = minDimension / 1000; // Adjust 1000 to your reference size
    const newScale = baseScale * scaleFactor;
    model.scale.set(newScale, newScale, newScale);
  }
}
