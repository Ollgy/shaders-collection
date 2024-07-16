import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { TGALoader } from 'three/addons/loaders/TGALoader.js';

export function setupModelLoaders() {
  const loadingManager = new THREE.LoadingManager();
  const objLoader = new OBJLoader(loadingManager);
  const mtlLoader = new MTLLoader(loadingManager);
  loadingManager.addHandler( /\.tga$/i, new TGALoader() );

  const textureLoader = new THREE.TextureLoader(loadingManager);
  
  return { objLoader, mtlLoader, textureLoader };
}

export function loadColorTexture(path, textureLoader) {
  let loader;
  if (!textureLoader) {
    const loadingManager = new THREE.LoadingManager();
    loader = new THREE.TextureLoader(loadingManager);
  } else {
    loader = textureLoader;
  }
  
  const texture = loader.load(path);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}