import { ImageSprite, FilledBox, TextSprite } from "../jetlag/Components/Appearance";
import { BoxBody } from "../jetlag/Components/RigidBody";
import { Actor } from "../jetlag/Entities/Actor";
import { Scene } from "../jetlag/Entities/Scene";
import { KeyCodes } from "../jetlag/Services/Keyboard";
import { stage } from "../jetlag/Stage";
import { chooserBuilder } from "./chooser";
import { createRestartButton, drawMuteButton } from "./common";

/**
 * Create an overlay (blocking all game progress) consisting of a text box over
 * a snapshot of the in-progress game.  Clearing the overlay will resume the
 * current level.
 *
 * @param level The current level
 */
export function pauseGame(level: number) {
    // Immediately install the overlay, to pause the game
    stage.requestOverlay((overlay: Scene, screenshot: ImageSprite | undefined) => {
        // Draw the screenshot
        new Actor({ appearance: screenshot!, rigidBody: new BoxBody({ cx: 8, cy: 4.5, width: 16, height: 9 }, { scene: overlay }), });

        // It's always good to have a way to go back to the chooser:
        new Actor({
            appearance: new ImageSprite({ img: "back_arrow.png", width: 1, height: 1 }),
            rigidBody: new BoxBody({ cx: 15.5, cy: .5, width: 1, height: 1 }, { scene: overlay }),
            gestures: { tap: () => { stage.clearOverlay(); stage.switchTo(chooserBuilder, Math.ceil(level / 4)); return true; } }
        });

        // Pressing anywhere on the text box will make the overlay go away
        new Actor({
            appearance: new FilledBox({ width: 2, height: 1, fillColor: "#000000" }),
            rigidBody: new BoxBody({ cx: 8, cy: 4.5, width: 2, height: 1 }, { scene: overlay }),
            gestures: { tap: () => { stage.clearOverlay(); return true; } },
        });
        new Actor({
            appearance: new TextSprite({ center: true, face: "Arial", color: "#FFFFFF", size: 28, z: 0 }, "Paused"),
            rigidBody: new BoxBody({ cx: 8, cy: 4.5, width: .1, height: .1 }, { scene: overlay }),
        });

        // It's not a bad idea to have a mute button...
        drawMuteButton({ scene: overlay, cx: 15.5, cy: 1.5, width: 1, height: 1 });
        createRestartButton({ scene: overlay, x: 15.5, y: 2.5, width: 1, height: 1 });
    }, true);
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_ESCAPE, () => (stage.clearOverlay()));


}