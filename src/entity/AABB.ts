import * as THREE from 'three';

export class AABB {
    private position: THREE.Vector2;
    private size: THREE.Vector2;

    constructor(position: THREE.Vector2, size: THREE.Vector2) {
        this.position = position;
        this.size = size;
    }

    public isColliding(other: AABB): boolean {
        return (
            Math.abs(this.position.x - other.position.x) < (this.size.x + other.size.x) / 2 &&
            Math.abs(this.position.y - other.position.y) < (this.size.y + other.size.y) / 2
        );
    }

    public update(position: THREE.Vector2): void {
        this.position = position;
    }

    public getPosition(): THREE.Vector2 {
        return this.position;
    }

    public getSize(): THREE.Vector2 {
        return this.size;
    }
}