import { FilledBox, ImageSprite, TextSprite } from "../jetlag/Components/Appearance";
import { BoxBody } from "../jetlag/Components/RigidBody";
import { Obstacle } from "../jetlag/Components/Role";
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

        let currentText = new Actor({
            appearance: new TextSprite({ center: true, face: "Arial", color: "#FFFFFF", size: 28, z: 0 }, "tes"),
            rigidBody: new BoxBody({ cx: 8, cy: 4.5, width: .1, height: .1 }, { scene: overlay }),
        });

        new Actor({
            appearance: new FilledBox({ width: 2, height: 1, fillColor: "#000000", z: -1 }),
            rigidBody: new BoxBody({ cx: 8, cy: 4.5, width: 2, height: 1 }, { scene: overlay }),
            gestures: {
                tap: () => {

                    //if (messages != text.length) {

                    //}
                    stage.clearOverlay(); return true;



                }
            },
        });






    }, true);



}