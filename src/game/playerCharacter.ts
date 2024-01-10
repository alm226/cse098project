import { ImageSprite } from "../jetlag/Components/Appearance";
import { ManualMovement } from "../jetlag/Components/Movement";
import { CircleBody } from "../jetlag/Components/RigidBody";
import { Hero } from "../jetlag/Components/Role";
import { Actor } from "../jetlag/Entities/Actor";
import { KeyCodes } from "../jetlag/Services/Keyboard";
import { Stage, stage } from "../jetlag/Stage";
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
        appearance: new ImageSprite({ width: 0.8, height: 0.8, z: 1, img: "playerCharacter.png" }),
        rigidBody: new CircleBody({ cx: x, cy: y, radius: 0.4 }, { passThroughId: passThroughId }),
        movement: new ManualMovement(),
        role: new Hero(),
    });

    /*stage.keyboard.setKeyUpHandler(KeyCodes.KEY_UP, () => (player.movement as ManualMovement).updateYVelocity(0));
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_DOWN, () => (player.movement as ManualMovement).updateYVelocity(0));
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_LEFT, () => (player.movement as ManualMovement).updateXVelocity(0));
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_RIGHT, () => (player.movement as ManualMovement).updateXVelocity(0));
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_UP, () => (player.movement as ManualMovement).updateYVelocity(-5));
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_DOWN, () => (player.movement as ManualMovement).updateYVelocity(5));
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_LEFT, () => (player.movement as ManualMovement).updateXVelocity(-5));
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_RIGHT, () => (player.movement as ManualMovement).updateXVelocity(5));
*/


    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_UP, () => {
        let playerX = player.rigidBody.getCenter().x;
        let playerY = player.rigidBody.getCenter().y;
        movementCheck(playerX, playerY, stage, 0, -1, player)


    })

    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_DOWN, () => {
        let playerX = player.rigidBody.getCenter().x;
        let playerY = player.rigidBody.getCenter().y;

        movementCheck(playerX, playerY, stage, 0, 1, player)

    })

    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_LEFT, () => {

        let playerX = player.rigidBody.getCenter().x;
        let playerY = player.rigidBody.getCenter().y;
        movementCheck(playerX, playerY, stage, -1, 0, player)

    })

    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_RIGHT, () => {
        let playerX = player.rigidBody.getCenter().x;
        let playerY = player.rigidBody.getCenter().y;
        movementCheck(playerX, playerY, stage, 1, 0, player)

    })

    return player;
}

/***
 * Function to check if the player can move somewhere
 * @param playerX the player's current X coordinate
 * @param playerY the player's current Y coordinate
 * @param stage the stage the player's on
 * @param xDir the change in X
 * @param yDir the chage in Y
 */
function movementCheck(playerX: number, playerY: number, stage: Stage, xDir: number, yDir: number, player: Actor) {
    console.log("X direction: " + xDir + " Y direction: " + yDir)
    for (let actor of stage.world.physics!.actorsAt({ x: playerX + xDir, y: playerY + yDir })) {
        if (actor.appearance.z > -1) {
            console.log(actor)
            if (actor.extra.isWall) {
                console.log("Wall in the way :(")
                return
            }
            if (actor.extra.isPushBox) {
                console.log("There's a pushbox here!")
                let pushBoxX = actor.rigidBody.getCenter().x;
                let pushBoxY = actor.rigidBody.getCenter().y;

                for (let boxActor of stage.world.physics!.actorsAt({ x: pushBoxX + xDir, y: pushBoxY + yDir })) {
                    if (boxActor.extra.isWall && !boxActor.extra.isTarget) {
                        console.log("Wall in way of pushBox")
                        return
                    }
                    if (boxActor.extra.isTarget) {
                        actor.role.onCollide(boxActor)
                        console.log("Target")

                    }

                }


                actor.rigidBody.setCenter(actor.rigidBody.getCenter().x + xDir, actor.rigidBody.getCenter().y + yDir)

            }



        }
    }
    console.log("nothing in the way :)")
    player.rigidBody.setCenter(player.rigidBody.getCenter().x + xDir, player.rigidBody.getCenter().y + yDir)
}