import { FilledBox, ImageSprite, TextSprite } from "../jetlag/Components/Appearance";
import { Actor } from "../jetlag/Entities/Actor";
import { stage } from "../jetlag/Stage";
import { BoxBody } from "../jetlag/Components/RigidBody";
import { MusicComponent } from "../jetlag/Components/Music";
import { chooserBuilder } from "./chooser";
import { helpBuilder } from "./help";
import { PStore, drawMuteButton, persist } from "./common";
import { gameBuilder } from "./play";
import { creditsBuilder } from "./credits";
import { Scene } from "../jetlag/Entities/Scene";

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
    let vPlayer = document.getElementById("video-player")
    let gPlayer = document.getElementById("game-player")

    // Draw some text.  Tapping its *rigidBody* will go to the first page of the
    // level chooser
    new Actor({
        appearance: new TextSprite({ center: false, face: "Times New Roman", size: 25, color: "#000000" }, "test"),
        rigidBody: new BoxBody({ cx: 7, cy: 0, width: 1, height: 0.5 }),
        gestures: {
            tap: () => {
                if (vPlayer != null && gPlayer != null) { gPlayer.style.display = "none"; vPlayer.style.display = "block"; }

                return true;
            }
        }
    });



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
        appearance: new TextSprite({ center: false, face: "Times New Roman", size: 25, color: "#000000" }, "Credits"),
        rigidBody: new BoxBody({ cx: 0, cy: 5, width: 1, height: 0.5 }),
        gestures: { tap: () => { stage.switchTo(creditsBuilder, 1); return true; } }
    });

    new Actor({
        appearance: new TextSprite({ center: false, face: "Times New Roman", size: 25, color: "#000000" }, "Delete data"),
        rigidBody: new BoxBody({ cx: 0, cy: 8, width: 1, height: 0.5 }),
        gestures: {
            tap: () => {
                stage.requestOverlay((overlay: Scene) => {

                    // Pressing anywhere on the black background will make the overlay go away
                    new Actor({
                        appearance: new FilledBox({ width: 16, height: 9, fillColor: "#000000" }),
                        rigidBody: new BoxBody({ cx: 8, cy: 4.5, width: 16, height: 9 }, { scene: overlay }),
                    });

                    let areYouSure = new Actor({
                        appearance: new TextSprite({ center: false, face: "Times New Roman", size: 25, color: "#FF0000" },
                            "Are you sure? This will delete your progress.\nThis cannot be undone"),
                        rigidBody: new BoxBody({ cx: 8, cy: 4.5, width: 1, height: 0.5 }, { scene: overlay }),
                    })
                    let yes = new Actor({
                        appearance: new TextSprite({ center: false, face: "Times New Roman", size: 25, color: "#FFFFFF" }, "Yes"),
                        rigidBody: new BoxBody({ cx: 6, cy: 5.5, width: 1, height: 0.5 }, { scene: overlay }),
                        gestures: {
                            tap: () => {
                                let pstore = JSON.parse(stage.storage.getPersistent("persistent_info")!) as PStore
                                pstore.levelsBeat = 0;
                                persist(pstore, "persistent_info");
                                areYouSure.enabled = false;
                                yes.enabled = false;
                                no.enabled = false;
                                stage.clearOverlay();

                                return true;
                            }
                        }
                    })
                    let no = new Actor({
                        appearance: new TextSprite({ center: false, face: "Times New Roman", size: 25, color: "#FFFFFF" }, "No"),
                        rigidBody: new BoxBody({ cx: 10, cy: 5.5, width: 1, height: 0.5 }, { scene: overlay }),
                        gestures: {
                            tap: () => {
                                areYouSure.enabled = false;
                                yes.enabled = false;
                                no.enabled = false;
                                stage.clearOverlay();

                                return true;
                            }
                        }
                    })


                }, false);

                return true;

                /*
                                let areYouSure = new Actor({
                                    appearance: new TextSprite({ center: false, face: "Times New Roman", size: 25, color: "#000000" }, "Are you sure? This will delete your progress."),
                                    rigidBody: new BoxBody({ cx: 5, cy: 5, width: 1, height: 0.5 }),
                                })
                                let yes = new Actor({
                                    appearance: new TextSprite({ center: false, face: "Times New Roman", size: 25, color: "#000000" }, "Yes"),
                                    rigidBody: new BoxBody({ cx: 4, cy: 6, width: 1, height: 0.5 }),
                                    gestures: {
                                        tap: () => {
                                            let pstore = JSON.parse(stage.storage.getPersistent("persistent_info")!) as PStore
                                            pstore.levelsBeat = 0;
                                            persist(pstore, "persistent_info");
                                            areYouSure.enabled = false;
                                            yes.enabled = false;
                                            no.enabled = false;
                                            return true;
                                        }
                                    }
                                })
                                let no = new Actor({
                                    appearance: new TextSprite({ center: false, face: "Times New Roman", size: 25, color: "#000000" }, "No"),
                                    rigidBody: new BoxBody({ cx: 6, cy: 6, width: 1, height: 0.5 }),
                                    gestures: {
                                        tap: () => {
                                            areYouSure.enabled = false;
                                            yes.enabled = false;
                                            no.enabled = false;
                                            return true;
                                        }
                                    }
                                })
                
            }, false);
                return true;*/
            }
        }
    });

    // And a mute button...
    drawMuteButton({ cx: 15, cy: 8, width: .75, height: .75, scene: stage.world });
}