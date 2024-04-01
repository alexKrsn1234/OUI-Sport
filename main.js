import './game.css'
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import { CubeTexture } from "@babylonjs/core/Materials/Textures/cubeTexture";
import { EnvironmentHelper } from "@babylonjs/core/Helpers/environmentHelper";
import { FreeCamera, Texture, MeshBuilder, StandardMaterial } from '@babylonjs/core';

// required imports
import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/loaders/glTF";
import "@babylonjs/core/Materials/standardMaterial";
import "@babylonjs/core/Materials/Textures/Loaders/envTextureLoader";

// Get the canvas element
var canvas = document.getElementById("game");

export class Game {
    constructor (canvas) {
        // Load Babylon 3D engine
        this.engine = new Engine(canvas, true);
        // Call the createScene function
        this.scene = this.createScene();
        this.CreateController();
        // Run the render loop
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

    };

    createScene() {
        // Create a basic Babylon scene
        var scene = new Scene(this.engine);
    
        scene.onPointerDown = (evt)=>{
            if(evt.button === 0) this.engine.enterPointerlock();
            if(evt.button === 1) this.engine.exitPointerlock();
        }
        
        const framesPerSecond = 60;
        const gravity = -9.81;
        scene.gravity = new Vector3(0,gravity/framesPerSecond,0);
        scene.collisionsEnabled = true;


        // Create a light
        var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
        light.intensity = 1;
    
        // Create a sphere
        // var sphere = MeshBuilder.CreateSphere("sphere", { diameter: 10 }, scene);
        // var box = MeshBuilder.CreateBox("box",{size : 10}, scene)
        // box.rotation.x=10;
        // box.position.x=10;
        // box.position.y=-5;


        // Create a ground
        var runGrd = MeshBuilder.CreateGround("runGrd", { width: 300, height: 300 }, scene);
        runGrd.material = this.CreateGroundMaterial();
        var grassGrd = MeshBuilder.CreateGround("Grassground", { width: 150, height: 150 }, scene);
        grassGrd.material = this.CreateGrassGroundMaterial();
        grassGrd.position.y=0.1;

        runGrd.checkCollisions = true;
        // sphere.checkCollisions = true;
        // box.checkCollisions = true;

        const model = this.CreateTable(scene, 1, new Vector3(0, 0, 5));
        // const model1 = this.CreateTable(scene, 1, new Vector3(15, 0, 5));
        // const model2 = this.CreateTable(scene, 1, new Vector3(30, 0, 5));

        return scene;
    };

    async CreateTable(scene_, size, pos) {
        const model = await SceneLoader.ImportMeshAsync(
            "",
            "./mesh/all/", 
            "table.glb", 
            scene_,
        );

        model.meshes.map(mesh => {
            mesh.checkCollisions = true;
            if (size != 1) {
                mesh.scaling = new Vector3(size, size, size);
            }
            mesh.position = pos;
        });
        return model;
    };

    CreateGroundMaterial() {
        const runGrdMat = new StandardMaterial("runGrdMat", this.scene);
        const  diffuseTex = new Texture(
            "./textures/textures/red_sand_diff_1k.jpg",
            this.scene)
        
            runGrdMat.diffuseTexture= diffuseTex
        return runGrdMat;
    };

    CreateGrassGroundMaterial() {
        const grassGrdMat = new StandardMaterial("grassGrdMat", this.scene);
        const  diffuseTex = new Texture(
            "./textures/Grass_001_SD/Grass_001_COLOR.jpg",
            this.scene)
            diffuseTex.uScale=10;
            diffuseTex.vScale=10;
            grassGrdMat.diffuseTexture= diffuseTex;
        return grassGrdMat;
    };

    CreateController(){
        var camera = new FreeCamera("camera", new Vector3(0, 10, 0), this.scene);
        camera.attachControl();
        camera.applyGravity = true;
        camera.checkCollisions = true;
        camera.ellipsoid = new Vector3(1, 1, 1);
        camera.speed = 0.5;
        camera.angularSensibility = 4000;
        camera.minZ=0.75;
        camera.onAfterCheckInputsObservable.add(() => {
            camera.cameraDirection.y = 0;
        });
        camera.keysUp.push(90);
        camera.keysLeft.push(81);
        camera.keysRight.push(68);
        camera.keysDown.push(83);
        
    };
}

const game = new Game(document.getElementById('game'));

// Handle window resizing
window.addEventListener("resize", function () {
    game.engine.resize();
});