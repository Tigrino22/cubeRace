import * as THREE from 'three';
import { Camera } from './Camera';
import { Player } from '../entity/Player';
import { Physic } from './Physic';
import { Enemy } from '../entity/Enemy';
import { Text } from '../graphics/Text';

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

    // SCORE
    private score: number = 0;
    private scoreText: Text;
    private lastScore: string = '';

    // ENEMY
    private enemy: Enemy;


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

        // ENEMY
        this.enemy = new Enemy(this.canvas);
        this.scene.add(this.enemy.getMesh());

        // SCORE
        this.scoreText = new Text('0');
        this.scoreText.getText().color = '#FFFFFF';
        this.scoreText.getText().position.set(360,250,0);
        this.scoreText.getText().textHeight = 40;
        this.scene.add(this.scoreText.getText());
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
        
        const fixedDelta = 1 / this.FPS;

        while (this.timeUpdate >= fixedDelta) {
            this.update(fixedDelta);
            this.accumulator += 1;
            this.timeUpdate -= fixedDelta;
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

    private update(intermediateTime: number): void  {
        this.player.update(intermediateTime);
        this.enemy.update(intermediateTime);

        this.score += intermediateTime;

        const score = Math.floor(this.score).toString();
        if (this.lastScore != score) {
            this.lastScore = score;
            this.scoreText.setText(score);
        }

        // Vérification de la collision entre le joueur et l'ennemi
        if (this.player.getAABB().isColliding(this.enemy.getAABB())) {
            console.log('Collision');
        }
    }

    private render(): void  {
        this.renderer.render(this.scene, this.camera.getCamera());
    }
}