import { FilledBox, TextSprite } from "../jetlag/Components/Appearance";
import { Actor } from "../jetlag/Entities/Actor";
import { stage } from "../jetlag/Stage";
import { BoxBody } from "../jetlag/Components/RigidBody";
import { MusicComponent } from "../jetlag/Components/Music";
import { chooserBuilder } from "./chooser";
import { helpBuilder } from "./help";
import { PStore, drawMuteButton, persist } from "./common";
import { gameBuilder } from "./play";
import { creditsBuilder } from "./credits";

/**
 * splashBuilder will draw the scene that we see when the game starts. In our
 * case, it's just a menu and some branding.
 *
 * There is usually only one splash screen, but JetLag allows for many, so there
 * is a `level` parameter.  In this code, we just ignore it.
 *
 * @param level Which splash screen should be displayed
 */
export function splashBuilder(_level: number) {
    // start the music
    /*    if (stage.gameMusic === undefined)
            stage.gameMusic = new MusicComponent(stage.musicLibrary.getMusic("tune2.ogg"));
        stage.gameMusic.play();
    */
    // Draw a brown box at the top of the screen, put some text in it
    new Actor({
        appearance: new TextSprite({ center: false, face: "Times New Roman", size: 50, color: "#000000" }, "Ghosted: The Game"),
        rigidBody: new BoxBody({ cx: 0, cy: 0, width: .1, height: .1 }),
    });
    new Actor({
        appearance: new TextSprite({ center: false, face: "Times New Roman", size: 25, color: "#000000" }, "(working title)"),
        rigidBody: new BoxBody({ cx: 0, cy: 1, width: .1, height: .1 }),
    });
    new Actor({
        appearance: new TextSprite({ center: false, face: "Times New Roman", size: 25, color: "#000000" }, "(title screen WIP)"),
        rigidBody: new BoxBody({ cx: 0, cy: 2, width: .1, height: .1 }),
    });

    // Draw some text.  Tapping its *rigidBody* will go to the first page of the
    // level chooser
    new Actor({
        appearance: new TextSprite({ center: false, face: "Times New Roman", size: 25, color: "#000000" }, "Play"),
        rigidBody: new BoxBody({ cx: 0, cy: 3, width: 1, height: 0.5 }),
        gestures: { tap: () => { stage.switchTo(gameBuilder, 1); return true; } }
    });

    // Draw some text.  Tapping its *rigidBody* will go to the first page of the
    // level chooser
    new Actor({
        appearance: new TextSprite({ center: false, face: "Times New Roman", size: 25, color: "#000000" }, "Level Select"),
        rigidBody: new BoxBody({ cx: 0, cy: 4, width: 1, height: 0.5 }),
        gestures: { tap: () => { stage.switchTo(chooserBuilder, 1); return true; } }
    });

    // Draw some text.  Tapping its *rigidBody* will go to the first page of the
    // level chooser
    new Actor({
        appearance: new TextSprite({ center: false, face: "Times New Roman", size: 25, color: "#000000" }, "Level Select"),
        rigidBody: new BoxBody({ cx: 0, cy: 4, width: 1, height: 0.5 }),
        gestures: { tap: () => { stage.switchTo(creditsBuilder, 1); return true; } }
    });

    new Actor({
        appearance: new TextSprite({ center: false, face: "Times New Roman", size: 25, color: "#000000" }, "Delete data"),
        rigidBody: new BoxBody({ cx: 0, cy: 8, width: 1, height: 0.5 }),
        gestures: {
            tap: () => {
                let pstore = JSON.parse(stage.storage.getPersistent("persistent_info")!) as PStore
                pstore.levelsBeat = 0;
                persist(pstore, "persistent_info");
                return true;
            }
        }
    });

    // And a mute button...
    drawMuteButton({ cx: 15, cy: 8, width: .75, height: .75, scene: stage.world });
}