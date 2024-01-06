import { ImageSprite } from "../jetlag/Components/Appearance";
import { BoxBody } from "../jetlag/Components/RigidBody";
import { Obstacle } from "../jetlag/Components/Role";
import { Actor } from "../jetlag/Entities/Actor";
import { stage } from "../jetlag/Stage";
import { AdvancedCollisionSystem } from "../jetlag/Systems/Collisions";
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
export function createTarget(x: number, y: number, passThroughId: Array<number>, box: Actor, lockedWall: Actor) {
    //target block
    let target = new Actor({
        appearance: new ImageSprite({ width: 0.8, height: 0.8, img: "target.png" }),
        rigidBody: new BoxBody({ cx: x, cy: y, width: 0.8, height: 0.8 }, { passThroughId: passThroughId }),
        role: new Obstacle({
            heroCollision: () => {
                (stage.world.physics as AdvancedCollisionSystem).addEndContactHandler(target, box, () => {
                    target.enabled = false;
                    box.enabled = false;
                    console.log("box hits target")
                    unlock(lockedWall, [8]);
                });
            }
        }),
    });
    return target;
}