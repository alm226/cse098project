import { ImageSprite } from "../jetlag/Components/Appearance";
import { BoxBody } from "../jetlag/Components/RigidBody";
import { Hero } from "../jetlag/Components/Role";
import { Actor } from "../jetlag/Entities/Actor";
/***
 * Function to create a push box
 * Is a hero role (subject to change)
 * Dynamic
 * @param x the X coordinate to create the push box at
 * @param y the Y coordinate to create the push box at
 * @passThroughId the pass through id array for this push box
 */
export function createPushBox(x: number, y: number, passThroughId: Array<number>) {
    //box to push
    let box = new Actor({
        appearance: new ImageSprite({ width: 0.9, height: 0.9, img: "moveable_block.png" }),
        //TODO: do we want to disable rotation?
        rigidBody: new BoxBody({ cx: x, cy: y, width: 0.9, height: 0.9 }, { passThroughId: passThroughId, dynamic: true, disableRotation: true }),
        role: new Hero(),
        //we use the extra field to hold isPushBox
        //and in target.ts we check to see if its there
        //so the target knows if a hero is a pushBox or not
        extra: { isPushBox: true }
    });

    return box;
}