import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';

export function setupScene() {
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.z = 5;
  camera.lookAt(0, 0, 0);

  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.update();

  window.addEventListener('resize', onWindowResize.bind(this, camera, renderer));

  return { camera, scene, renderer };
}

function onWindowResize(camera) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}