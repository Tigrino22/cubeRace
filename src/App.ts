import { Engine } from "./core/Engine";

export class App {
    private engine: Engine | null = null;

    public start() {
        this.engine = new Engine();
        this.engine.start();
    }
}