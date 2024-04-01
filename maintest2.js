import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import { CubeTexture } from "@babylonjs/core/Materials/Textures/cubeTexture";
import { EnvironmentHelper } from "@babylonjs/core/Helpers/environmentHelper";

// required imports
import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/core/Materials/standardMaterial";
import "@babylonjs/loaders";


// digital assets
// import controllerModel from "../../assets/glb/samsung-controller.glb";
// import roomEnvironment from "../../assets/environment/room.env"

export class FpsScene {
    constructor () {
        // Create a basic Babylon scene
        var scene = new BABYLON.Scene(this.engine);
    
        scene.onPointerDown = (evt)=>{
            if(evt.button === 0) this.engine.enterPointerlock();
            if(evt.button === 1) this.engine.exitPointerlock();
        }
        
        const framesPerSecond = 60;
        const gravity = -9.81;
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
        scene.camera = this.CreateController();

        // Créer le player
        var capsule = BABYLON.MeshBuilder.CreateCapsule("playerCollider", {height: 4, radius: 2, tessellation: 16}, scene);


        return scene;
    }
};