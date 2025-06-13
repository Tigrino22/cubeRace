import * as THREE from 'three';
import { AABB } from './AABB';

export abstract class Entity {
    protected geometry: THREE.PlaneGeometry;
    protected material: THREE.MeshBasicMaterial;
    protected mesh: THREE.Mesh;
    protected position: THREE.Vector2;

    protected size: number = 100;

    protected aabb: AABB;

    constructor(geometry: THREE.PlaneGeometry, material: THREE.MeshBasicMaterial, position: THREE.Vector2) {
        this.geometry = geometry;
        this.material = material;
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.position = position;
        this.mesh.position.set(this.position.x, this.position.y, 0);

        this.aabb = new AABB(this.position, this.getSize());
    }

    public getMesh(): THREE.Mesh {
        return this.mesh;
    }

    public getPosition(): THREE.Vector2 {
        return this.position;
    }

    public getSize(): THREE.Vector2 {
        return new THREE.Vector2(this.geometry.parameters.width, this.geometry.parameters.height);
    }

    public getAABB(): AABB {
        return this.aabb;
    }

    public setPosition(position: THREE.Vector2): void {
        this.position = position;
        this.mesh.position.set(this.position.x, this.position.y, 0);
    }

    public setSize(size: THREE.Vector2): void {
        this.mesh.scale.set(size.x, size.y, 1);
    }

    public abstract update(time: number): void;

}
