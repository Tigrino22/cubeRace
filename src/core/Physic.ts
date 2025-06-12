export class Physic {
    
    private static gravity: number = 9.81;
    private static floorHeight: number = 10;
    private static gameVelocity: number = 15;

    public static getGravity(): number {
        return Physic.gravity;
    }

    public static getFloorPosition(): number {
        return Physic.floorHeight;
    }

    public static setFloorPosition(position: number): void {
        Physic.floorHeight = position;
    }

    public static getGameVelocity(): number {
        return Physic.gameVelocity;
    }

    public static setGameVelocity(velocity: number): void {
        Physic.gameVelocity = velocity;
    }

}