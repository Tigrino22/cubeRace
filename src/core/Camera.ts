import * as THREE from 'three';

export class Camera {

    private camera: THREE.OrthographicCamera;
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        
        this.camera = new THREE.OrthographicCamera(
            this.canvas.width / - 2, this.canvas.width / 2,
            this.canvas.height / 2, this.canvas.height / - 2,
            1, 1000
        );

        this.camera.position.z = 10;
    }

    getCamera(): THREE.OrthographicCamera {
        return this.camera;
    }
}

