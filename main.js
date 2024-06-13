import './style.css';
import * as THREE from 'three';
import { createCamera } from './camera.js';

export function createScene() {

  const canvas = document.getElementById("myCanvas");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x777777);

  const { camera, onMouseDown, onMouseUp, onMouseMove } = createCamera();

  const boxMesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial()
  );
  scene.add(boxMesh);

  const draw = () => {
    renderer.render(scene, camera);
  };

  const start = () => {
    renderer.setAnimationLoop(draw);
  };

  const stop = () => {
    renderer.setAnimationLoop(null);
  };

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener("resize", onWindowResize, false);

  // Attach event listeners
  canvas.addEventListener("mousedown", onMouseDown, false);
  canvas.addEventListener("mouseup", onMouseUp, false);
  canvas.addEventListener("mousemove", onMouseMove, false);

  return {
    start,
    stop,
  };
}
