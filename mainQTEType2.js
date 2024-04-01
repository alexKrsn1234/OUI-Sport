import './game.css'
import * as BABYLON from 'babylonjs';

//  https://playground.babylonjs.com/#A584HZ#9
//   avoir plusieurs caméra dans une scene


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
        // Run the render loop
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

    }

    createScene = function () {
        // Create a basic Babylon scene
        var scene = new BABYLON.Scene(this.engine);
        
        var camera = new BABYLON.ArcRotateCamera("camera", 0,0,10,new BABYLON.Vector3(0, 0, 0), this.scene);
        camera.attachControl(canvas, true);

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
        box.position.x=10;
        box.position.y=0;
        box.position.z=-5; 
        camera.setTarget(box);
        camera.radius=50;


        var speed = 0.3;
        var isSuccess = false;
        var QTEkeys = ["a","z", "q", "s","d"];
        var QTEkey = QTEkeys[Math.floor(Math.random()*QTEkeys.length)];
        console.log("QTE SUIVANT :"+ QTEkey);
        var limitBox = BABYLON.MeshBuilder.CreateBox("startBox", { size: 5 }, scene);
        limitBox.material = new BABYLON.StandardMaterial("limitBox", scene);
        limitBox.material.diffuseColor = new BABYLON.Color3(1, 0, 0);
        limitBox.material.alpha=0.5;
        limitBox.position.x = 30;
        //startBox.isVisible = false;

        // Réinitialisation du QTE
        var looseQTE = function () {
            box.position.x = 10;
            limitBox.position.x = 30;
            console.log("QTE PERDU");
            isSuccess = false;
        };

        var NextQTE = function () {
            limitBox.position.x += 20;
            QTEkey = QTEkeys[Math.floor(Math.random()*QTEkeys.length)];
            console.log("QTE SUIVANT :"+ QTEkey);
            isSuccess = false;
        };

        scene.onBeforeRenderObservable.add(function () {
            box.position.x += speed;
            if (box.intersectsMesh(limitBox, false) && !isSuccess) {
                looseQTE();
            } 
            if (box.intersectsMesh(limitBox, false) && isSuccess) {
                NextQTE();
            }
        });

        // Détection de l'appui sur la barre d'espace
        canvas.addEventListener("keydown", function (event) {
            console.log(event.key);
            if (event.key === QTEkey && box.position.x < limitBox.position.x ) { 
                isSuccess = true;
            }
        });



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
}

const game = new Game(document.getElementById('game'));

// Handle window resizing
window.addEventListener("resize", function () {
    game.engine.resize();
});