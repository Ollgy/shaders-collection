import * as THREE from 'three';

const ROOM_HEIGHT = 30;
const ROOM_SIZE = 50;

export function initRoom(scene, materials) {
  const walls = createWalls(scene, materials.walls);
  const ceiling = createCeiling(scene, materials.ceiling);
  const floor = createFloor(scene, materials.floor);
  return { walls, floor, ceiling };
}

function createWalls(scene, material) {
  const wallGroup = new THREE.Group(scene);
  scene.add(wallGroup);

  const wallMaterial = material || new THREE.MeshStandardMaterial({ color: "#2b2929" })
  const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry(ROOM_SIZE, ROOM_HEIGHT, 0.01),
    wallMaterial
  );
  frontWall.position.z = -ROOM_SIZE / 2;

  const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(ROOM_SIZE, ROOM_HEIGHT, 0.01),
    wallMaterial
  );
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.x = - ROOM_SIZE / 2;

  const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry(ROOM_SIZE, ROOM_HEIGHT, 0.01),
    wallMaterial
  );
  rightWall.rotation.y = - Math.PI / 2;
  rightWall.position.x = ROOM_SIZE / 2;

  wallGroup.add(frontWall, leftWall, rightWall);
  return wallGroup;
}

async function createCeiling(scene, material) {
  const planeGeometry = new THREE.PlaneGeometry(ROOM_SIZE, ROOM_SIZE);
  const ceilingMaterial = material || new THREE.MeshBasicMaterial({ color: "#f1f1f1", side: THREE.DoubleSide});
  const ceiling = new THREE.Mesh(planeGeometry, ceilingMaterial);
  ceiling.rotation.x = - Math.PI / 2; 
  ceiling.position.y = ROOM_HEIGHT /2; 
  scene.add(ceiling);

  return ceiling;
}

function createFloor(scene, material) {
  const boxGeometry = new THREE.BoxGeometry(ROOM_SIZE, ROOM_SIZE, 0.1);
  const floorMaterial = material || new THREE.MeshBasicMaterial({ color: "blue", side: THREE.DoubleSide });
  const floor = new THREE.Mesh(boxGeometry, floorMaterial);
  floor.rotation.x = Math.PI / 2; 
  floor.position.y = -ROOM_HEIGHT / 2;
  scene.add(floor);

  return floor;
}