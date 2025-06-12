import * as THREE from 'three';
import { Physic } from '../core/Physic';
import { Entity } from './Entity';

export class Player extends Entity {

    private isJumping: boolean = false;

    private velocityY: number = 0;
    private jumpStrength: number = 100;

    constructor(pos: THREE.Vector2) {
        super(new THREE.PlaneGeometry(100, 100), new THREE.MeshBasicMaterial({ color: 0xFFF}), pos);
    }

    jump(): void {
        if (!this.isJumping) {
            this.velocityY = this.jumpStrength;
            this.isJumping = true;
        }
    }

    update(dt: number): void {
        // Gravity
        this.velocityY -= Physic.getGravity() * dt * Physic.getGameVelocity();
        this.position.y += this.velocityY * dt * Physic.getGameVelocity();

        this.setPosition(new THREE.Vector2(this.position.x, this.position.y));
    }

    /**
     * Set the position of the player and check if the player is on the floor
     * @param pos - The new position of the player
     */
    setPosition(pos: THREE.Vector2): void {
        this.position.x = pos.x;
        this.position.y = pos.y;

        // Floor
        if (this.position.y - this.getSize().y / 2 < Physic.getFloorPosition()) {
            this.position.y = Physic.getFloorPosition() + this.getSize().y / 2;
            this.velocityY = 0;
            this.isJumping = false;
        }

        this.mesh.position.set(this.position.x, this.position.y, 0);
    }   
}