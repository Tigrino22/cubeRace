export class Physic {
    
    private static gravity: number = 9.81;
    private static floorHeight: number = 10;

    public static getGravity(): number {
        return Physic.gravity;
    }

    public static getFloorPosition(): number {
        return Physic.floorHeight;
    }

    public static setFloorPosition(position: number): void {
        Physic.floorHeight = position;
    }

}