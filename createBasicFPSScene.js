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
 

// digital assets
// import controllerModel from "../../assets/glb/samsung-controller.glb";
// import roomEnvironment from "../../assets/environment/room.env"

export class FpsScene {
    constructor () {
        // Create a basic Babylon scene
        let scene = new BABYLON.Scene(this.engine);
        
        const framesPerSecond = 60;
        const gravity = -9.81;
        scene.gravity = new BABYLON.Vector3(0,gravity/framesPerSecond,0);
        scene.collisionsEnabled = true;


        // Create a light
        let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 1;
    
        // Create a sphere
        let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 10 }, scene);
        let box = BABYLON.MeshBuilder.CreateBox("box",{size : 10}, scene)
        box.rotation.x=10;
        box.position.x=10;
        box.position.y=-5;


        // Create a ground
        let runGrd = BABYLON.MeshBuilder.CreateGround("runGrd", { width: 300, height: 300 }, scene);
        runGrd.material = this.CreateGroundMaterial();
        let grassGrd = BABYLON.MeshBuilder.CreateGround("Grassground", { width: 150, height: 150 }, scene);
        grassGrd.material = this.CreateGrassGroundMaterial();
        grassGrd.position.y=0.1;

        runGrd.checkCollisions = true;
        sphere.checkCollisions = true;
        box.checkCollisions = true;

        // Créer le player
        let capsule = BABYLON.MeshBuilder.CreateCapsule("playerCollider", {height: 4, radius: 2, tessellation: 16}, scene);
        let camera = BABYLON.FreeCamera()


        return scene;
    }
};