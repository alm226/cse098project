import { ImageSprite } from "../jetlag/Components/Appearance";
import { BoxBody } from "../jetlag/Components/RigidBody";
import { Obstacle } from "../jetlag/Components/Role";
import { Actor } from "../jetlag/Entities/Actor";
/***
 * Function to create a locked wall
 * Similar to a regular wall, but can be unlocked (i.e. player can move through it)
 * @param x the X coordinate to create the locked wall at
 * @param y the Y coordinate to create the locked wall at
 */
export function createLockedWall(x: number, y: number) {
    //locked wall segment
    let lockedWall = new Actor({
        appearance: new ImageSprite({ width: 0.8, height: 0.8, img: "locked.png" }),
        rigidBody: new BoxBody({ cx: x, cy: y, width: .8, height: 0.8 }, { kinematic: false, dynamic: false }),
        role: new Obstacle(),
    })

    return lockedWall;
}

/***
 * Function to unlock a locked wall
 * This will replace the locked wall with a new actor, the unlocked wall
 * This will allow anything in the pass through id team to pass through it
 * i.e. player or possibly a push box if the puzzle need
 * @param wall the locked wall we want to unlock
 * @param passThroughId the pass through id array we want to give the unlocked wall
 */
export function unlock(wall: Actor, passThroughId: Array<number>) {
    wall.enabled = false;
    let unlockedWall = new Actor({
        appearance: new ImageSprite({ width: 0.8, height: 0.8, img: "unlocked.png" }),
        //create this new unlocked wall where the locked wall once was
        rigidBody: new BoxBody({ cx: wall.rigidBody.getCenter().x, cy: wall.rigidBody.getCenter().y, width: .8, height: 0.8 }, { passThroughId: passThroughId, kinematic: false, dynamic: false }),
        role: new Obstacle(),
    })
    return unlockedWall
}