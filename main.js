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
let canvas = document.getElementById("game");
const jump_length = 60;
let frameCount = 0;
let gravity = -9.81;

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
}

// Handle window resizing
window.addEventListener("resize", function () {
    game.engine.resize();
});