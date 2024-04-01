import './game.css'
import * as BABYLON from 'babylonjs';




//
//
//  https://playground.babylonjs.com/#A584HZ#9
//   avoir plusieurs caméra dans une scene
//
//

// Get the canvas element
var canvas = document.getElementById("game");
var gravity = -9.81;
var boxCord={x:10,y:-5,z:-5};
var frameRate = 60;

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
        sphere.position.x=-10;
        var box = BABYLON.MeshBuilder.CreateBox("box",{size : 10}, scene)
        box.rotation.x=10;
        box.position.x=10;
        box.position.y=-5;
        box.position.z=-5;

        const xSlide = new BABYLON.Animation("xSlide", "position.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        const keyFrames = [];
        keyFrames.push({
            frame: 0,
            value: 10,
        });
        keyFrames.push({
            frame: frameRate,
            value: -10,
        });
        keyFrames.push({
            frame: 2 * frameRate,
            value: 2,
        });
        xSlide.setKeys(keyFrames);
        box.animations.push(xSlide);
        scene.beginAnimation(box, 0, 2 * frameRate, true);
        console.log(box.position.x);
        

        // Create a ground
        var runGrd = BABYLON.MeshBuilder.CreateGround("runGrd", { width: 300, height: 300 }, scene);
        runGrd.material = this.CreateGroundMaterial();
        var grassGrd = BABYLON.MeshBuilder.CreateGround("Grassground", { width: 150, height: 150 }, scene);
        grassGrd.material = this.CreateGrassGroundMaterial();
        grassGrd.position.y=0.1;


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
    var camera = new BABYLON.ArcRotateCamera("camera", 0,0,10,new BABYLON.Vector3(0, 0, 0), this.scene);
    camera.setPosition(new BABYLON.Vector3(1.5, 1.5, 10));
    camera.attachControl(canvas, true);
    camera.setTarget(new BABYLON.Vector3(boxCord.x-10, boxCord.y+10, boxCord.z));
    camera.alpha = 3;
    camera.beta = 1.5
    camera.radius = 10;
}
}

const game = new Game(document.getElementById('game'));

// Handle window resizing
window.addEventListener("resize", function () {
    game.engine.resize();
});