import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);


const geometry = new THREE.TorusKnotGeometry(10, 3, 20, 100); //10, 3, 100, 16
const material = new THREE.MeshStandardMaterial({
  color: 0xf01009,
  wireframe: true,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStars() {
  const geometry = new THREE.OctahedronGeometry(.2, 1, .1);
  const material = new THREE.MeshStandardMaterial({ color: 0xCffff,   wireframe: true}); //0xffffff
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(1000).fill().forEach(addStars);

const spaceTexture = (scene.background = new THREE.TextureLoader().load(
  "../img/port.jpg"
));
scene.background = spaceTexture;

// cubo
const michiTexture = new THREE.TextureLoader().load("../img/cubo1.jpg");

const michi = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshBasicMaterial({ map: michiTexture })
);
scene.add(michi);

//moon
const moonTexture = new THREE.TextureLoader().load("../img/moon.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshBasicMaterial({
    map: moonTexture,

  })
);
scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);



//scroll

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.position.z = t * 0.05;
  moon.position.x = t * 0.072;
  moon.rotation.y = t * 0.05;

  michi.position.z = t * 0.01;
  michi.position.x = t * 0.01;

  michi.rotation.z = t * 0.01;
  michi.rotation.x = t * 0.01;
  michi.rotation.Y = t * 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
  
}

document.body.onscroll = moveCamera;


function animate() {
  requestAnimationFrame(animate);
  
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.y += 0.01;

  controls.update();

  renderer.render(scene, camera);
  
}

animate();



