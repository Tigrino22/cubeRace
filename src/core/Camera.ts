import * as THREE from 'three';

export class Camera {

    private camera: THREE.OrthographicCamera;

    constructor() {
        this.camera = new THREE.OrthographicCamera(
            window.innerWidth / - 2, window.innerWidth / 2,
            window.innerHeight / 2, window.innerHeight / - 2,
            1, 1000
        );

        this.camera.position.z = 10;
    }

    getCamera(): THREE.OrthographicCamera {
        return this.camera;
    }
}

