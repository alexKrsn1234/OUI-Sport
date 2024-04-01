import './game.css'
import * as BABYLON from 'babylonjs';
import * as CANNON from "cannon";
// https://playground.babylonjs.com/#A584HZ#9 !!!!!!!!!!!!!!!
// Get the canvas element
var canvas = document.getElementById("game");

export class Game {
    constructor (canvas) {
        // Load Babylon 3D engine
        this.engine = new BABYLON.Engine(canvas, true);
        // Call the createScene function
        this.scene = this.createScene();
        this.CreateController();
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


        // Create a light
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 1;
    
        // Create a sphere
        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 10 }, scene);
        
        // Create a ground
        var runGrd = BABYLON.MeshBuilder.CreateGround("runGrd", { width: 300, height: 300 }, scene);
        runGrd.material = this.CreateGroundMaterial();




        var grassGrd = BABYLON.MeshBuilder.CreateGround("Grassground", { width: 150, height: 150 }, scene);
        grassGrd.material = this.CreateGrassGroundMaterial();
        grassGrd.position.y=0.1;

        var box = BABYLON.MeshBuilder.CreateBox("box",{size : 10}, scene)
        box.position = new BABYLON.Vector3(0,10,0)
        scene.enablePhysics(
            new BABYLON.Vector3(0,-9.81, 0),
            new BABYLON.CannonJSPlugin(true, 10, CANNON)
        );

        runGrd.physicsImpostor = new BABYLON.PhysicsImpostor(
            runGrd,
            BABYLON.PhysicsImpostor.BoxImpostor,
            {mass:0, restitution:0.5}
        );
        box.physicsImpostor = new BABYLON.PhysicsImpostor(
            box,
            BABYLON.PhysicsImpostor.BoxImpostor,
            {mass:1, restitution:0}
        );

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
    var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(-10, 10, 0), this.scene);
         camera.attachControl();
         camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
         camera.speed = 0.5;
         camera.angularSensibility = 8000;
         camera.minZ=0.75;
        // camera.onAfterCheckInputsObservable.add(() => {
        //    camera.cameraDirection.y = 0;
        //});
        //camera.keysUp.push(90);
        //camera.keysLeft.push(81);
        //camera.keysRight.push(68);
        //camera.keysDown.push(83);
        //camera.setPosition(new BABYLON.Vector3(this.scene.box.position.x, this.scene.box.position.y, this.scene.box.position.z));
        // canvas.addEventListener("keydown", (event) => {
        //     if (event.isComposing) {
        //       return;
        //     }
        //     if (event.key === " "){
        //    camera.cameraDirection.y += 5;

        //         console.log("space");
        //     }
            
        //  });

        
}
}

const game = new Game(document.getElementById('game'));

// Handle window resizing
window.addEventListener("resize", function () {
    game.engine.resize();
});