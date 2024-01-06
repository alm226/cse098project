import { ImageSprite } from "../jetlag/Components/Appearance";
import { BoxBody } from "../jetlag/Components/RigidBody";
import { Obstacle } from "../jetlag/Components/Role";
import { Actor } from "../jetlag/Entities/Actor";

export function createLockedWall(x: number, y: number) {
    //locked wall segment
    let lockedWall = new Actor({
        appearance: new ImageSprite({ width: 0.8, height: 0.8, img: "locked.png" }),
        rigidBody: new BoxBody({ cx: x, cy: y, width: .8, height: 0.8 }, { kinematic: false, dynamic: false }),
        role: new Obstacle(),
    })

    return lockedWall;
}

export function unlock(wall: Actor, passThroughId: Array<number>) {
    wall.enabled = false;
    let unlockedWall = new Actor({
        appearance: new ImageSprite({ width: 0.8, height: 0.8, img: "unlocked.png" }),
        rigidBody: new BoxBody({ cx: wall.rigidBody.getCenter().x, cy: wall.rigidBody.getCenter().y, width: .8, height: 0.8 }, { passThroughId: passThroughId, kinematic: false, dynamic: false }),
        role: new Obstacle(),
    })
    return unlockedWall
}