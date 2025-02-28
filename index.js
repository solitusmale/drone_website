// Import Three.js modules
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Select container
const container = document.getElementById('drone-container');

// Setup Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement); // Attach to container

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 5, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040, 2)); // Soft fill light

// Load Drone Model
const loader = new GLTFLoader();
loader.load('./3d/drone_DJIp.glb', function (gltf) {
    let drone = gltf.scene;
    scene.add(drone);

    // Adjust scale and position
    drone.scale.set(5, 5, 5);
    drone.position.set(0, 0, 0);

    // Adjust camera settings
    camera.position.set(0, 10, 50); // Move camera further back
    camera.lookAt(drone.position);

    animate();
}, undefined, function (error) {
    console.error('Error loading the drone model:', error);
});


// Mouse Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.8;
camera.position.set(0, 2, 5);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

// Start Animation
animate();
