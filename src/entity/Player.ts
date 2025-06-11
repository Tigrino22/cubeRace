import * as THREE from 'three';

export class Player {

    private geometry: THREE.PlaneGeometry;
    private material: THREE.MeshBasicMaterial;
    private mesh: THREE.Mesh;

    private posX: number;
    private posY: number;

    constructor(pos: THREE.Vector2) {
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshBasicMaterial({ color: 0xFFF});
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.posX = pos.x;
        this.posY = pos.y;
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
        this.mesh.position.set(this.posX, this.posY, 0);
    }
}