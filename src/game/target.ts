import { ImageSprite } from "../jetlag/Components/Appearance";
import { BoxBody } from "../jetlag/Components/RigidBody";
import { Obstacle } from "../jetlag/Components/Role";
import { Actor } from "../jetlag/Entities/Actor";
import { unlock } from "./lockedWall";
/***
 * Create a target block
 * This is a block that will unlock a given locked wall
 * When the given push box is pushed onto it
 * @param x the X coordinate for the target block to be created at
 * @param y the Y coordinate for the target block to be created at
 * @param passThroughId the pass through id array - ideally should be the same as the push box
 * @param box the push box this target box is receptive to
 * @param lockedWall the locked wall this target block will unlock
 */
export function createTarget(x: number, y: number, passThroughId: Array<number>, lockedWall: Actor, requiredWall?: Actor) {
    //target block
    let target = new Actor({
        appearance: new ImageSprite({ width: 1, height: 1, img: "target.png" }),
        rigidBody: new BoxBody({ cx: x, cy: y, width: 1, height: 1 }, { passThroughId: passThroughId }),
        role: new Obstacle({
            heroCollision: (thisTarget: Actor, collisionActor: Actor) => {
                //   console.log("hero collision called")
                //on collision, check if the hero that collides with this target block
                //has isPushBox in its extra field
                if (collisionActor.extra.isPushBox) {
                    thisTarget.enabled = false;

                    if (collisionActor.extra.isDestroyed) {
                        collisionActor.enabled = false;
                    }
                    if (typeof requiredWall !== 'undefined') {
                        unlock(lockedWall, [8], requiredWall);
                    }
                    else {
                        unlock(lockedWall, [8]);
                    }
                }
            },
        }),
        extra: { isWall: true, isTarget: true }
    });
    return target;
}
