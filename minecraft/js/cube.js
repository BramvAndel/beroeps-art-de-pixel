import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(600, 600);
renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(window.devicePixelRatio);

// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(4, 5, 11);

const controls = new OrbitControls(camera, renderer.domElement);
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;
controls.target = new THREE.Vector3(0, 0, 0); // Center the controls target
controls.update();
camera.aspect = 600 / 600;
camera.updateProjectionMatrix();
renderer.setSize(600, 600);

const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x555555,
  side: THREE.DoubleSide
});

const ambientLight = new THREE.AmbientLight(0x333333, 40);
scene.add(ambientLight);

const loader = new GLTFLoader().setPath('block/');
let mesh;
loader.load('scene.gltf', (gltf) => {
  console.log('loading model');
  mesh = gltf.scene;
  mesh.scale.set(2, 2, 2);

  mesh.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  mesh.position.set(0, -1, 0); // Center the model
  scene.add(mesh);

  controls.target.copy(mesh.position); // Ensure the controls target the model
  controls.update(); // Update controls after loading the model
});

let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let rotationSpeed = 0;

const container = document.getElementById('container3D');
if (container) {
  container.appendChild(renderer.domElement);

  container.addEventListener('mousedown', (event) => {
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
  });

  container.addEventListener('mousemove', (event) => {
    if (isDragging) {
      const deltaX = event.clientX - previousMousePosition.x;
      rotationSpeed = deltaX * 0.01; // Adjust the multiplier for desired sensitivity
      previousMousePosition = { x: event.clientX, y: event.clientY };
    }
  });

  container.addEventListener('mouseup', () => {
    isDragging = false;
  });

  container.addEventListener('mouseleave', () => {
    isDragging = false;
  });
} else {
  console.error('Container element not found');
}

function animate() {
  requestAnimationFrame(animate);

  if (mesh) {
    if (!isDragging) {
      mesh.rotation.y += rotationSpeed;
      rotationSpeed *= 0.95; // Apply friction to gradually stop the rotation
    }
  }

  controls.update();
  renderer.render(scene, camera);
}

animate();