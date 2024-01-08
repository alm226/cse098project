import { FilledBox, ImageSprite, TextSprite } from "../jetlag/Components/Appearance";
import { BoxBody } from "../jetlag/Components/RigidBody";
import { PhysicsCfg } from "../jetlag/Config";
import { Actor } from "../jetlag/Entities/Actor";
import { Scene } from "../jetlag/Entities/Scene";
import { stage } from "../jetlag/Stage";

/***
 * Function to create rpg style textboxes using overlays
 * @param text array of messages to print in order
 * @param portraits array of names of images to use
 * @param order array of indecies in portraits so the textbox displays the right portrait
 */
export function textbox(text: Array<string>, portraits: Array<string>, order: Array<number>) {
    // Immediately install the overlay, to pause the game
    stage.requestOverlay((overlay: Scene, screenshot: ImageSprite | undefined) => {
        // Draw the screenshot
        new Actor({ appearance: screenshot!, rigidBody: new BoxBody({ cx: 8, cy: 4.5, width: 16, height: 9 }, { scene: overlay }), });
        let messages = 0;
        let x = 8
        let y = 6.5

        //text sprite
        let currentText = new Actor({
            appearance: new TextSprite({ center: true, face: "Arial", color: "#FFFFFF", size: 28, z: 0 }, text[messages]),
            rigidBody: new BoxBody({ cx: x, cy: y, width: .1, height: .1 }, { scene: overlay }),
        });
        //portrait sprite
        let currentPortrait = new Actor({
            appearance: new ImageSprite({ width: 0.8, height: 0.8, img: portraits[order[messages]], z: 0 }),
            rigidBody: new BoxBody({ cx: x - 2.5, cy: y, width: 1, height: 1 }, { scene: overlay }),
        })
        //give the portrait a black border
        new Actor({
            appearance: new FilledBox({ width: 0.9, height: 0.9, fillColor: "#000000", z: -1 }),
            rigidBody: new BoxBody({ cx: x - 2.5, cy: y, width: 1, height: 1 }, { scene: overlay }),
        })


        //the black background
        new Actor({
            appearance: new FilledBox({ width: 4, height: 1, fillColor: "#000000", z: -1 }),
            rigidBody: new BoxBody({ cx: x, cy: y, width: 4, height: 1 }, { scene: overlay }),
            gestures: {
                tap: () => {
                    //loop through the message array
                    if (messages != text.length - 1) {
                        messages++;
                        currentText = updateText(text[messages], currentText, overlay, x, y)
                        currentPortrait = updatePortrait(portraits[order[messages]], x, y, currentPortrait, overlay)
                    }
                    else {
                        stage.clearOverlay(); return true;
                    }
                    return false;
                }
            },
        });
    }, true);
}

/***
 * Function to update the text on a text sprite
 * @param message the new text to display
 * @param textSprite the sprite to be updating
 * @scene the scene (i.e. overlay)
 * @x the x coordinate
 * @y the y coordinate
 */
function updateText(message: string, textSprite: Actor, scene: PhysicsCfg["scene"], x: number, y: number) {
    textSprite.enabled = false;
    let currentText = new Actor({
        appearance: new TextSprite({ center: true, face: "Arial", color: "#FFFFFF", size: 28, z: 0 }, message),
        rigidBody: new BoxBody({ cx: x, cy: y, width: .1, height: .1 }, { scene: scene }),
    });
    return currentText
}

/***
 * Function to update the image on the character portrait actor
 * @param imgName the name of the character portrait image (best practice is to use arrays)
 * @x the x coordinate of the textbox (we will subtract 2 from it to make it look nice)
 * @y the y coordinate of the textbox
 * @portrat the portrait actor
 * @scene the scene (i.e. overlay)
 */
function updatePortrait(imgName: string, x: number, y: number, portrait: Actor, scene: PhysicsCfg["scene"]) {
    portrait.enabled = false;
    let currentPortrait = new Actor({
        appearance: new ImageSprite({ width: 0.8, height: 0.8, img: imgName }),
        rigidBody: new BoxBody({ cx: x - 2.5, cy: y, width: 1, height: 1 }, { scene: scene }),
    })
    return currentPortrait;
}