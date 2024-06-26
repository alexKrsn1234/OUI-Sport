import './game.css'
import * as BABYLON from 'babylonjs';
import FpsScene from './createBasicFPSScene.js'




//
//
//  https://playground.babylonjs.com/#A584HZ#9
//   avoir plusieurs caméra dans une scene
//
//

// Get the canvas element
var canvas = document.getElementById("game");
const jump_length = 60;
let frameCount = 0;
var gravity = -9.81;

export class Game {
    constructor (canvas) {
        // Load Babylon 3D engine
        this.engine = new BABYLON.Engine(canvas, true);
        // Call the createScene function
        this.scene = this.FpsScene();
        // Run the render loop
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    createScene = function () {
        // Create a basic Babylon scene
        var scene = new BABYLON.Scene(this.engine);
    
        scene.onPointerDown = (evt)=>{
            if(evt.button === 0) this.engine.enterPointerlock();
            if(evt.button === 1) this.engine.exitPointerlock();
        }
        
        const framesPerSecond = 60;
        scene.gravity = new BABYLON.Vector3(0,gravity/framesPerSecond,0);
        scene.collisionsEnabled = true;


        // Create a light
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 1;
    
        // Create a sphere
        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 10 }, scene);
        var box = BABYLON.MeshBuilder.CreateBox("box",{size : 10}, scene)
        box.rotation.x=10;
        box.position.x=10;
        box.position.y=-5;


        // Create a ground
        var runGrd = BABYLON.MeshBuilder.CreateGround("runGrd", { width: 300, height: 300 }, scene);
        runGrd.material = this.CreateGroundMaterial();
        var grassGrd = BABYLON.MeshBuilder.CreateGround("Grassground", { width: 150, height: 150 }, scene);
        grassGrd.material = this.CreateGrassGroundMaterial();
        grassGrd.position.y=0.1;

        runGrd.checkCollisions = true;
        sphere.checkCollisions = true;
        box.checkCollisions = true;
        return scene;
    }

    CreateGroundMaterial() {
        const runGrdMat = new BABYLON.StandardMaterial("runGrdMat", this.scene);
        const  diffuseTex = new BABYLON.Texture(
            "./textures/textures/red_sand_diff_1k.jpg",
            this.scene)
        
            runGrdMat.diffuseTexture= diffuseTex
        return runGrdMat;
    }

    CreateGrassGroundMaterial() {
        const grassGrdMat = new BABYLON.StandardMaterial("grassGrdMat", this.scene);
        const  diffuseTex = new BABYLON.Texture(
            "./textures/Grass_001_SD/Grass_001_COLOR.jpg",
            this.scene)
            diffuseTex.uScale=10;
            diffuseTex.vScale=10;
            grassGrdMat.diffuseTexture= diffuseTex;
        return grassGrdMat;
    }

CreateController(){
    var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 10, 0), this.scene);
         camera.attachControl();
         camera.applyGravity = true;
         camera._needMoveForGravity = true
         camera.checkCollisions = true;
         camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
         camera.speed = 0.5;
         camera.angularSensibility = 8000;
         camera.minZ=0.75;
         camera.onAfterCheckInputsObservable.add(() => {
            camera.cameraDirection.y = 0;
        });
        camera.keysUp.push(90);
        camera.keysLeft.push(81);
        camera.keysRight.push(68);
        camera.keysDown.push(83);
        canvas.addEventListener("keydown", (event) => {
        if (event.isComposing) {
            return;
        }
        if (event.key === " "){
            camera.cameraDirection.y += 5;
            console.log("space");
        }
            
  });
        
}
}

const game = new Game(document.getElementById('game'));
const STATUS = {
    'menu': 0,
    'game': 1
};
const game_status = STATUS.game;

const mainLoop = (engine, scene) => {
    if (game_status == STATUS.menu) {
        console.log('menu');
    } else if (game_status == STATUS.game) {
        scene.render();
    }
};

// Handle window resizing
window.addEventListener("resize", function () {
    game.engine.resize();
});