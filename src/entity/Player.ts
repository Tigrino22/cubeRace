import * as THREE from 'three';
import { Physic } from '../core/Physic';

export class Player {

    private geometry: THREE.PlaneGeometry;
    private material: THREE.MeshBasicMaterial;
    private mesh: THREE.Mesh;

    private posX: number;
    private posY: number;

    private isJumping: boolean = false;

    private velocityY: number = 0;
    private jumpStrength: number = 80;

    constructor(pos: THREE.Vector2) {
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshBasicMaterial({ color: 0xFFF});
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.posX = pos.x;
        this.posY = pos.y;
    }

    jump(): void {
        if (!this.isJumping) {
            this.velocityY = this.jumpStrength;
            this.isJumping = true;
            console.log('jump');
        }
    }

    update(dt: number): void {
        // Gravity
        this.velocityY -= Physic.getGravity() * dt * 10;
        this.posY += this.velocityY * dt * 10;

        this.setPos(new THREE.Vector2(this.posX, this.posY));
    }

    getSize(): THREE.Vector2 {
        return new THREE.Vector2(this.geometry.parameters.width, this.geometry.parameters.height);
    }

    getMesh(): THREE.Mesh {
        return this.mesh;
    }

    getPosX(): number {
        return this.posX;
    }

    getPosY(): number {
        return this.posY;

    }

    setPos(pos: THREE.Vector2): void {
        this.posX = pos.x;
        this.posY = pos.y;

        // Floor
        if (this.posY - this.getSize().y / 2 < Physic.getFloorPosition()) {
            this.posY = Physic.getFloorPosition() + this.getSize().y / 2;
            this.velocityY = 0;
            this.isJumping = false;
        }

        this.mesh.position.set(this.posX, this.posY, 0);
    }   
}