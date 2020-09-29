import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r120/three.module.js";
import { DeviceOrientationControls } from "https://cdn.rawgit.com/mrdoob/three.js/master/examples/jsm/controls/DeviceOrientationControls.js";
import { GLTFLoader } from "https://cdn.rawgit.com/mrdoob/three.js/master/examples/jsm/loaders/GLTFLoader.js";
function __init3DModel() {
  var camera, scene, renderer, controls, house;
  var startButton = document.getElementById("startButton");
  startButton.addEventListener(
    "click",
    function () {
      init();
      animate();
    },
    false
  );
  function init() {
    var overlay = document.getElementById("overlay");
    var btn_start = document.getElementById("startButton");
    var ctn_progressBar = document.getElementById("progress-bar-container");
    var progressBar = document.getElementById("progress-bar");
    btn_start.style.display = "none";
    ctn_progressBar.style.display = "block";
    camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      5000
    );
    camera.position.set(0, 2, 10);
    controls = new DeviceOrientationControls(camera);
    scene = new THREE.Scene();
    var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    //   var material = new THREE.MeshBasicMaterial({
    //     map: new THREE.TextureLoader().load("./2294472375_24a3b8ef46_o.jpg"),
    //   });
    //   var mesh = new THREE.Mesh(geometry, material);
    //   scene.add(mesh);

    //   var helperGeometry = new THREE.BoxBufferGeometry(100, 100, 100, 4, 4, 4);
    //   var helperMaterial = new THREE.MeshBasicMaterial({
    //     color: 0xff00ff,
    //     wireframe: true,
    //   });
    //   var helper = new THREE.Mesh(helperGeometry, helperMaterial);
    //   scene.add(helper);

    //Load Model
    let loader = new GLTFLoader();
    loader.load(
      // resource URL
      "./scene_glb/scene.glb",
      // called when the resource is loaded
      function (gltf) {
        scene.add(gltf.scene);
        house = gltf.scene.children[0];
      },
      // called while loading is progressing
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        progressBar.value = (xhr.loaded / xhr.total) * 100;
        if ((xhr.loaded / xhr.total) * 100 == 100) {
          overlay.remove();
        }
      },
      // called when loading has errors
      function (error) {
        console.log("An error happened");
      }
    );

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    window.addEventListener("resize", onWindowResize, false);
  }
  function animate() {
    window.requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

__init3DModel();
