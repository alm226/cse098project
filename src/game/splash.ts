import { FilledBox, TextSprite } from "../jetlag/Components/Appearance";
import { Actor } from "../jetlag/Entities/Actor";
import { stage } from "../jetlag/Stage";
import { BoxBody } from "../jetlag/Components/RigidBody";
import { MusicComponent } from "../jetlag/Components/Music";
import { chooserBuilder } from "./chooser";
import { helpBuilder } from "./help";
import { drawMuteButton } from "./common";

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


    // And a mute button...
    drawMuteButton({ cx: 15, cy: 8, width: .75, height: .75, scene: stage.world });
}