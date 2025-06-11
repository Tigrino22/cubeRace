import { Engine } from "./core/Engine";

export class App {
    private engine: Engine | null = null;

    public start() {
        const canvas = document.getElementById('app') as HTMLCanvasElement;
        if (!canvas) {
            console.error('Canvas not found');
            return;
        }
        this.engine = new Engine(canvas);
        this.engine.start();
    }
}