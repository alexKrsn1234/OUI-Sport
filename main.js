import './game.css'
import * as BABYLON from 'babylonjs';

// Get the canvas element
var canvas = document.getElementById("game");

// Load Babylon 3D engine
var engine = new BABYLON.Engine(canvas, true);

// Create scene
var createScene = function () {
    // Create a basic Babylon scene
    var scene = new BABYLON.Scene(engine);

    // Create a camera
    var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    // Create a light
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // Create a sphere
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);

    // Create a ground
    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 0 }, scene);

    return scene;
};

// Call the createScene function
var scene = createScene();

// Run the render loop
engine.runRenderLoop(function () {
    scene.render();
});

// Handle window resizing
window.addEventListener("resize", function () {
    engine.resize();
});
