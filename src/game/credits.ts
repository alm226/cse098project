import { FilledBox, ImageSprite, TextSprite } from "../jetlag/Components/Appearance";
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
    new Actor({
        appearance: new FilledBox({ width: 16, height: 9, z: -1, fillColor: "31272A" }),
        rigidBody: new BoxBody({ cx: 8, cy: 4.5, width: 16, height: 9 })
    })
    // Draw a brown box at the top of the screen, put some text in it
    new Actor({
        appearance: new TextSprite({ center: true, face: "Times New Roman", size: 50, color: "#ffffff" }, "Ghosted: The Game"),
        rigidBody: new BoxBody({ cx: 8, cy: 1, width: .1, height: .1 }),
    });
    new Actor({
        appearance: new TextSprite({ center: true, face: "Times New Roman", size: 25, color: "#ffffff" }, "by"),
        rigidBody: new BoxBody({ cx: 8, cy: 3, width: .1, height: .1 }),
    });
    new Actor({
        appearance: new TextSprite({ center: true, face: "Times New Roman", size: 25, color: "#ffffff" }, "Studio awesome game making zone people cool squad team"),
        rigidBody: new BoxBody({ cx: 8, cy: 4, width: .1, height: .1 }),
    });
    new Actor({
        appearance: new TextSprite({ center: true, face: "Times New Roman", size: 25, color: "#6c9b71" }, "Alex Margulies"),
        rigidBody: new BoxBody({ cx: 2, cy: 5, width: .1, height: .1 }),
    });
    new Actor({
        appearance: new TextSprite({ center: true, face: "Times New Roman", size: 25, color: "#5b0b8c" }, "Anders Heyniger"),
        rigidBody: new BoxBody({ cx: 6, cy: 5, width: .1, height: .1 }),
    });
    new Actor({
        appearance: new TextSprite({ center: true, face: "Times New Roman", size: 25, color: "#FFC0CB" }, "Lauren Hull"),
        rigidBody: new BoxBody({ cx: 10, cy: 5, width: .1, height: .1 }),
    });
    new Actor({
        appearance: new TextSprite({ center: true, face: "Times New Roman", size: 25, color: "#3944bc" }, "Trevor Busch"),
        rigidBody: new BoxBody({ cx: 14, cy: 5, width: .1, height: .1 }),
    });
    new Actor({
        appearance: new TextSprite({ center: true, face: "Times New Roman", size: 25, color: "#ffffff" }, "Made in the JetLag engine"),
        rigidBody: new BoxBody({ cx: 8, cy: 7, width: .1, height: .1 })
    })
    new Actor({
        appearance: new TextSprite({ center: true, face: "Times New Roman", size: 25, color: "#ffffff" }, "Thanks for playing!"),
        rigidBody: new BoxBody({ cx: 8, cy: 8, width: .1, height: .1 }),
    });

    // Add a button for returning to the splash screen
    new Actor({
        appearance: new ImageSprite({ width: 1, height: 1, img: "back_button.png" }),
        rigidBody: new BoxBody({ width: 1, height: 1, cx: 15.5, cy: 8.5 }),
        gestures: { tap: () => { stage.switchTo(splashBuilder, 1); return true; } }
    });
}