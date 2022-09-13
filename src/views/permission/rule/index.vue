<template>
  <el-card class="main">
    <div id="earthDemo" class="earth"></div>
  </el-card>
</template>

<script setup lang="ts">
import * as Three from "three";
import { MeshBasicMaterial } from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const earthDom = document.getElementById("earthDemo");
const earthWidth = earthDom?.offsetWidth as number;
const earthHeight = earthDom?.offsetHeight as number;

const scene = new Three.Scene();

const camera = new Three.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  2000
);
camera.position.set(-50, -50, 130);
camera.aspect = earthWidth / earthHeight;
camera.updateProjectionMatrix();
scene.add(camera);

const planeGeometry = new Three.PlaneGeometry(100, 100);
const planeMaterial = new MeshBasicMaterial({
  color: 0xccffff,
});
const plane = new Three.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

// antialias 抗锯齿
const renderer = new Three.WebGLRenderer({
  antialias: true,
});
renderer.outputEncoding = Three.sRGBEncoding;
renderer.setSize(earthWidth, earthHeight);

window.addEventListener("resize", () => {
  camera.aspect = earthWidth / earthHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(earthWidth, earthHeight);
});

earthDom?.appendChild(renderer.domElement);

// const controls = new OrbitControls(camera, renderer.domElement);
// scene.add(controls);

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
}
#earthDemo {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
