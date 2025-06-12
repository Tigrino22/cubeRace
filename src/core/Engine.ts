import * as THREE from 'three';
import { Camera } from './Camera';
import { Player } from '../entity/Player';
import { Physic } from './Physic';
import { Enemy } from '../entity/Enemy';

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

    // ENEMY
    private enemies: Enemy[] = [];
    private enemySpawnRate: number = 0.8;
    private enemySpawnTimer: number = 0;
    private enemySpawnCount: number = 2;


    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        this.camera = new Camera(this.canvas);
        this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, antialias: true});

        this.clock = new THREE.Clock();

        Physic.setFloorPosition(- this.canvas.height / 2 + 10);

        // PLAYER 
        // Positionnement du joueur sur le sol.
        this.player = new Player(new THREE.Vector2(0, 0));
        this.player.setPosition(new THREE.Vector2(
            -this.canvas.width / 2 + this.player.getSize().x / 2 + 50,
            Physic.getFloorPosition() + this.player.getSize().y / 2)
        );

        this.scene.add(this.player.getMesh());
    }

    start(): void {
        this.renderer.setSize(this.canvas.width, this.canvas.height);
        document.addEventListener('keydown', (event) => {
            if (event.key === ' ') {
                this.player.jump();
            }
        });
        this.loop();
        
    }

    private loop = (): void => {
        this.intermediateTime = this.clock.getDelta();
        this.timeUpdate += this.intermediateTime;
        this.timeAccumulator += this.intermediateTime;

        // ENEMY
        this.enemySpawnTimer += this.intermediateTime;
        if (this.enemySpawnTimer >= this.enemySpawnRate && this.enemies.length < this.enemySpawnCount) {
            const enemy = new Enemy(this.canvas);
            this.enemies.push(enemy);
            this.scene.add(enemy.getMesh());
            this.enemySpawnTimer = 0;
        }
        
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
        this.player.update(this.intermediateTime);
        this.enemies.forEach(enemy => {
            enemy.update(this.intermediateTime);
        });
    }

    private render(): void  {
        this.renderer.render(this.scene, this.camera.getCamera());
    }
}