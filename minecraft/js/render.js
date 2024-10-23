import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable alpha for transparency
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(600, 600);
renderer.setClearColor(0x000000, 0); // Set clear color with alpha 0 for transparency
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();
// scene.position.y = -100;
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

const ambientLight = new THREE.AmbientLight(0x333333, 10);

let isAnimating = false;
let rotationSpeed = 0.01;

export function loadAndInitializeModel(modelPath, containerId) {
  // Clear the scene
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }

  scene.add(ambientLight);
  const loader = new GLTFLoader().setPath(modelPath);
  let mesh;

  loader.load(
    'scene.gltf',
    (gltf) => {
      console.log('loading model');
      mesh = gltf.scene;
      mesh.scale.set(0.2, 0.2, 0.2); // Adjust the scale to make the model smaller

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

      initializeScene(containerId, mesh); // Initialize the scene with the loaded model
    },
    undefined,
    (error) => {
      console.error('An error happened while loading the model:', error);
    }
  );
}

function initializeScene(containerId, model) {
  const container = document.getElementById(containerId);
  const mesh = model;
  let isDragging = false;

  if (container) {
    container.addEventListener('mousedown', () => {
      isDragging = true;
    });

    container.addEventListener('mouseup', () => {
      isDragging = false;
    });

    container.addEventListener('mouseleave', () => {
      isDragging = false;
    });

    // Set the renderer size to match the container size
    const setRendererSize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    // Initial size setting
    setRendererSize();

    // Update the renderer size on window resize
    window.addEventListener('resize', setRendererSize);

    // Append the renderer to the container
    container.appendChild(renderer.domElement);
  } else {
    console.error('Container element not found');
    return;
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

  if (!isAnimating) {
    isAnimating = true;
    animate();
  }
}

export {scene}