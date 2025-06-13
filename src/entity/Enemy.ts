import * as THREE from 'three';
import { Entity } from "./Entity";
import { Physic } from '../core/Physic';


export class Enemy extends Entity {

    private velocityX: number = 20;
    private canvas: HTMLCanvasElement;

    private startTime: number = 0;

    constructor(canvas: HTMLCanvasElement) {
        // Spawn the enemy at the right of the canvas and at a random height
        const randomHeight = Math.random() * canvas.height - 80; // Taille de 100, voir comment la récupérer.
        const position = new THREE.Vector2(canvas.width / 2 + 50, randomHeight);
        const size = new THREE.Vector2(80, 80);

        super(new THREE.PlaneGeometry(size.x, size.y), new THREE.MeshBasicMaterial({ color: 0xFF0000}), position);

        this.canvas = canvas;
        this.position = position;
        this.aabb.update(position);
    }

    public getVelocityX(): number {
        return this.velocityX;
    }

    public setVelocityX(velocityX: number): void {
        this.velocityX = velocityX;
    }

    public update(dt: number): void {
        this.startTime += dt;
        if (this.startTime <= 2) return; // Wait 5 seconds before starting the enemy

        if (this.velocityX <= 50) {
            this.velocityX += 0.01; 
        }

        // Reset the enemy position when it is out of the canvas
        if (this.position.x < -this.canvas.width / 2 - this.getSize().x / 2) {
            this.position.x = this.canvas.width / 2 + this.getSize().x / 2;
            const margin = this.getSize().y / 2;
            this.position.y = Math.random() * (this.canvas.height - 2 * margin) - (this.canvas.height / 2 - margin) 
                - this.canvas.height / 2;
            if (this.position.y <= -this.canvas.height / 2 + this.getSize().y / 2) {
                this.position.y = Physic.getFloorPosition() + this.getSize().y / 2;
            }
        }

        this.position.x -= this.velocityX * dt * Physic.getGameVelocity();
        this.setPosition(new THREE.Vector2(this.position.x, this.position.y));
        this.aabb.update(this.position);
    }
}