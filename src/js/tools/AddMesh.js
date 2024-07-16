import * as THREE from 'three';

export function addCube(scene, size, color, meshMaterial) {
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = meshMaterial || new THREE.MeshPhongMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  return cube;
}

export function addPlane(scene, width, height, color, meshMaterial) {
  const geometry = new THREE.PlaneGeometry(width, height);
  const material = meshMaterial || new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide});
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  return plane;
}