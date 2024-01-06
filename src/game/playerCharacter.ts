import { ImageSprite } from "../jetlag/Components/Appearance";
import { ManualMovement } from "../jetlag/Components/Movement";
import { CircleBody } from "../jetlag/Components/RigidBody";
import { Hero } from "../jetlag/Components/Role";
import { Actor } from "../jetlag/Entities/Actor";
import { KeyCodes } from "../jetlag/Services/Keyboard";
import { stage } from "../jetlag/Stage";
/***
 * Function that creates a player character
 * Uses manual movement
 * Is a hero role (subject to change)
 * @param x the player's initial X coordinate
 * @param y the player's initial Y coordinate
 * @param passThroughId the player's passThroughId
 */
export function createPlayer(x: number, y: number, passThroughId: Array<number>) {
    //player character
    let player = new Actor({
        appearance: new ImageSprite({ width: 0.8, height: 0.8, img: "playerCharacter.png" }),
        rigidBody: new CircleBody({ cx: x, cy: y, radius: 0.4 }, { passThroughId: passThroughId }),
        movement: new ManualMovement(),
        role: new Hero(),
    });

    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_UP, () => (player.movement as ManualMovement).updateYVelocity(0));
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_DOWN, () => (player.movement as ManualMovement).updateYVelocity(0));
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_LEFT, () => (player.movement as ManualMovement).updateXVelocity(0));
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_RIGHT, () => (player.movement as ManualMovement).updateXVelocity(0));
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_UP, () => (player.movement as ManualMovement).updateYVelocity(-5));
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_DOWN, () => (player.movement as ManualMovement).updateYVelocity(5));
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_LEFT, () => (player.movement as ManualMovement).updateXVelocity(-5));
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_RIGHT, () => (player.movement as ManualMovement).updateXVelocity(5));

    return player;
}