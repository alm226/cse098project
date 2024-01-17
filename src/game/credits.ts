import { ImageSprite, TextSprite } from "../jetlag/Components/Appearance";
import { BoxBody } from "../jetlag/Components/RigidBody";
import { Actor } from "../jetlag/Entities/Actor";
import { stage } from "../jetlag/Stage";
import { splashBuilder } from "./splash";

/**
 * buildChooserScreen draws the level chooser screens.
 *
 * Since we have 9 levels, and we show 4 levels per screen, our chooser
 * will have 3 screens.
 *
 * @param level Which screen of the chooser should be displayed
 */
export function creditsBuilder(_level: number) {
    // Draw a brown box at the top of the screen, put some text in it
    new Actor({
        appearance: new TextSprite({ center: true, face: "Times New Roman", size: 50, color: "#000000" }, "Ghosted: The Game"),
        rigidBody: new BoxBody({ cx: 8, cy: 1, width: .1, height: .1 }),
    });
    new Actor({
        appearance: new TextSprite({ center: true, face: "Times New Roman", size: 25, color: "#000000" }, "by"),
        rigidBody: new BoxBody({ cx: 8, cy: 3, width: .1, height: .1 }),
    });
    new Actor({
        appearance: new TextSprite({ center: true, face: "Times New Roman", size: 25, color: "#000000" }, "Studio awesome game making zone people cool squad team"),
        rigidBody: new BoxBody({ cx: 8, cy: 4, width: .1, height: .1 }),
    });
    new Actor({
        appearance: new TextSprite({ center: true, face: "Times New Roman", size: 25, color: "#6c9b71" }, "Alex Margulies"),
        rigidBody: new BoxBody({ cx: 2, cy: 5, width: .1, height: .1 }),
    });
    new Actor({
        appearance: new TextSprite({ center: true, face: "Times New Roman", size: 25, color: "#000000" }, "Anders Heyniger"),
        rigidBody: new BoxBody({ cx: 6, cy: 5, width: .1, height: .1 }),
    });
    new Actor({
        appearance: new TextSprite({ center: true, face: "Times New Roman", size: 25, color: "#000000" }, "Lauren Hull"),
        rigidBody: new BoxBody({ cx: 10, cy: 5, width: .1, height: .1 }),
    });
    new Actor({
        appearance: new TextSprite({ center: true, face: "Times New Roman", size: 25, color: "#000000" }, "Trevor Busch"),
        rigidBody: new BoxBody({ cx: 14, cy: 5, width: .1, height: .1 }),
    });
    new Actor({
        appearance: new TextSprite({ center: true, face: "Times New Roman", size: 25, color: "#000000" }, "Thanks for playing!"),
        rigidBody: new BoxBody({ cx: 8, cy: 7, width: .1, height: .1 }),
    });

    // Add a button for returning to the splash screen
    new Actor({
        appearance: new ImageSprite({ width: 1, height: 1, img: "back_button.png" }),
        rigidBody: new BoxBody({ width: 1, height: 1, cx: 15.5, cy: 8.5 }),
        gestures: { tap: () => { stage.switchTo(splashBuilder, 1); return true; } }
    });
}