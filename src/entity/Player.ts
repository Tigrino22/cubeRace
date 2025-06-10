import * as THREE from 'three';

export class Player {

    private geometry: THREE.PlaneGeometry;
    private material: THREE.MeshBasicMaterial;
    private mesh: THREE.Mesh;

    constructor() {
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshBasicMaterial({ color: 0xFFF});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }

    getMesh() {
        return this.mesh;
    }
}