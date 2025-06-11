import * as THREE from 'three';
import { Camera } from './Camera';
import { Player } from '../entity/Player';

export class Engine {
    private canvas: HTMLCanvasElement;

    private scene: THREE.Scene;
    private camera: Camera;
    private renderer: THREE.WebGLRenderer; 

    private clock: THREE.Clock;

    private FPS: number = 60;
    private timeUpdate: number = 0;
    private accumulator: number = 0;
    private timeAccumulator: number = 0;
    private intermediateTime: number = 0;

    // PLAYER
    private player: Player;


    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.scene = new THREE.Scene();
        this.camera = new Camera(this.canvas);
        this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});


        this.clock = new THREE.Clock();

        this.player = new Player(new THREE.Vector2(0, 0));
        this.player.setPos(new THREE.Vector2(
            -this.canvas.width / 2 + this.player.getSize().x / 2,
            -this.canvas.height / 2 + this.player.getSize().y / 2)
        );
        
        this.scene.add(this.player.getMesh());
    }

    start(): void {
        this.renderer.setSize(this.canvas.width, this.canvas.height);

        this.loop();
        
    }

    private loop = (): void => {
        this.intermediateTime = this.clock.getDelta();
        this.timeUpdate += this.intermediateTime;
        this.timeAccumulator += this.intermediateTime;
        
        while (this.timeUpdate >= 1 / this.FPS) {
            this.update();

            this.accumulator += 1;
            this.timeUpdate -= (1/this.FPS);
        }

        
        this.render();  

        // DEBUG FPS
        if(this.timeAccumulator >= 1) {
            console.log(this.accumulator);
            this.timeAccumulator -= 1;
            this.accumulator = 0;
        }

        window.requestAnimationFrame(this.loop);
    }

    private update(): void  {
        
    }

    private render(): void  {
        this.renderer.render(this.scene, this.camera.getCamera());
    }
}