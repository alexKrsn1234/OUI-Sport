import './game.css'
import * as BABYLON from 'babylonjs';
import FpsScene from './createBasicFPSScene.js'


// Get the canvas element
var canvas = document.getElementById("game");
const jump_length = 60;
let frameCount = 0;

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