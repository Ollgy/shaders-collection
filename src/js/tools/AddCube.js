import * as THREE from 'three';

export function addCube(scene, size, color, meshMaterial) {
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = meshMaterial || new THREE.MeshPhongMaterial({ color });
  const cube = new THREE.Mesh( geometry, material );
  scene.add(cube);

  return cube;
}