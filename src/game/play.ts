import { PathMovement, TiltMovement, Path, ManualMovement } from "../jetlag/Components/Movement";
import { stage } from "../jetlag/Stage";
import { Scene } from "../jetlag/Entities/Scene";
import { FilledBox, ImageSprite, TextSprite } from "../jetlag/Components/Appearance";
import { Actor } from "../jetlag/Entities/Actor";
import { BoxBody, CircleBody } from "../jetlag/Components/RigidBody";
import { Hero, Destination, Enemy, Goodie, Obstacle, Sensor } from "../jetlag/Components/Role";
import { KeyCodes } from "../jetlag/Services/Keyboard";
import { splashBuilder } from "./splash";
import { chooserBuilder } from "./chooser";
import { b2Vec2 } from "@box2d/core";
import { drawMuteButton } from "./common";
import { AdvancedCollisionSystem } from "../jetlag/Systems/Collisions";

/**
 * gameBuilder is for drawing the playable levels of the game
 *
 * We currently have 9 levels, which is just enough to let the chooser be
 * interesting.
 *
 * @param level Which level should be displayed
 */
export function gameBuilder(level: number) {



    // Every level will have some common configuration stuff.  We'll put it all
    // here, at the top.  Some of it relies on functions that are at the end of
    // this file.
    // Draw four walls, covering the four borders of the world
    new Actor({
        appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
        rigidBody: new BoxBody({ cx: 8, cy: -.05, width: 16, height: .1 }),
        role: new Obstacle(),
    });
    new Actor({
        appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
        rigidBody: new BoxBody({ cx: 8, cy: 9.05, width: 16, height: .1 }),
        role: new Obstacle(),
    });
    new Actor({
        appearance: new FilledBox({ width: .1, height: 9, fillColor: "#ff0000" }),
        rigidBody: new BoxBody({ cx: -.05, cy: 4.5, width: .1, height: 9 }),
        role: new Obstacle(),
    });
    new Actor({
        appearance: new FilledBox({ width: .1, height: 9, fillColor: "#ff0000" }),
        rigidBody: new BoxBody({ cx: 16.05, cy: 4.5, width: .1, height: 9 }),
        role: new Obstacle(),
    });

    // Pressing a key will induce a force, releasing will stop inducing that force
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_UP, () => (stage.accelerometer.accel.y = 0));
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_DOWN, () => (stage.accelerometer.accel.y = 0));
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_LEFT, () => (stage.accelerometer.accel.x = 0));
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_RIGHT, () => (stage.accelerometer.accel.x = 0));
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_UP, () => (stage.accelerometer.accel.y = -5));
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_DOWN, () => (stage.accelerometer.accel.y = 5));
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_LEFT, () => (stage.accelerometer.accel.x = -5));
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_RIGHT, () => (stage.accelerometer.accel.x = 5));

    if (level == 1) {

        //Wall
        new Actor({
            appearance: new FilledBox({ width: 4, height: 2, fillColor: "#00ff00" }),
            rigidBody: new BoxBody({ cx: 4, cy: 4, width: 8, height: 2 }, { kinematic: false, dynamic: false }),
            role: new Obstacle(),
        });



        //player character
        let player = new Actor({
            appearance: new ImageSprite({ width: 0.8, height: 0.8, img: "playerCharacter.png" }),
            rigidBody: new CircleBody({ cx: 2, cy: 3, radius: 0.4 }),
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

        //box to push
        let box = new Actor({
            appearance: new ImageSprite({ width: 0.8, height: 0.8, img: "pushBox.png" }),
            rigidBody: new BoxBody({ cx: 15, cy: 8, width: 0.8, height: 0.8 }, { passThroughId: [7], dynamic: true }),
            role: new Hero(),
        });



        let collisions = 0;
        let messages = ["win"]
        //target block
        let target = new Actor({
            appearance: new ImageSprite({ width: 0.8, height: 0.8, img: "target.png" }),
            rigidBody: new BoxBody({ cx: 14, cy: 3, width: 0.8, height: 0.8 }, { passThroughId: [7] }),
            role: new Obstacle({
                heroCollision: () => {
                    (stage.world.physics as AdvancedCollisionSystem).addEndContactHandler(target, box, () => {
                        console.log("box hits target")
                    });
                }
            }),
        });



        //screen borders
        new Actor({
            appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
            rigidBody: new BoxBody({ cx: 8, cy: -.05, width: 16, height: .1 }),
            role: new Obstacle(),
        });
        new Actor({
            appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
            rigidBody: new BoxBody({ cx: 8, cy: 9.05, width: 16, height: .1 }),
            role: new Obstacle(),
        });
        new Actor({
            appearance: new FilledBox({ width: .1, height: 9, fillColor: "#ff0000" }),
            rigidBody: new BoxBody({ cx: -.05, cy: 4.5, width: .1, height: 9 }),
            role: new Obstacle(),
        });
        new Actor({
            appearance: new FilledBox({ width: .1, height: 9, fillColor: "#ff0000" }),
            rigidBody: new BoxBody({ cx: 16.05, cy: 4.5, width: .1, height: 9 }),
            role: new Obstacle(),
        });

        welcomeMessage("Use tilt (or arrows) to reach the destination");
    }

}
/**
 * Create an overlay (blocking all game progress) consisting of a black screen
 * with text.  Clearing the overlay will resume the current level.  This will
 * show immediately when the game starts.
 *
 * @param message A message to display in the middle of the screen
 */
function welcomeMessage(message: string) {
    // Immediately install the overlay, to pause the game
    stage.requestOverlay((overlay: Scene) => {
        // Pressing anywhere on the black background will make the overlay go away
        new Actor({
            appearance: new FilledBox({ width: 16, height: 9, fillColor: "#000000" }),
            rigidBody: new BoxBody({ cx: 8, cy: 4.5, width: 16, height: 9 }, { scene: overlay }),
            gestures: {
                tap: () => {
                    stage.clearOverlay();
                    return true;
                }
            },
        });
        // The text goes in the middle
        new Actor({
            rigidBody: new BoxBody({ cx: 8, cy: 4.5, width: .1, height: .1 }, { scene: overlay }),
            appearance: new TextSprite({ center: true, face: "Arial", color: "#FFFFFF", size: 28, z: 0 }, () => message),
        });
    }, false);
}
/**
 * Create an overlay (blocking all game progress) consisting of a text box over
 * a snapshot of the in-progress game.  Clearing the overlay will resume the
 * current level.
 *
 * @param level The current level
 */
function pauseGame(level: number) {
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
    }, true);
}

/**
 * Create an overlay (blocking all game progress) consisting of a text box over
 * a snapshot of the in-progress game.  Clearing the overlay will resume the
 * current level.  This is different from pauseGame in a few ways (see below).
 *
 * @param level The current level
 */
function specialPauseGame(level: number, h: Actor) {
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

        // A "cheat" button for winning right away
        new Actor({
            appearance: new ImageSprite({ width: 1, height: 1, img: "green_ball.png" }),
            rigidBody: new CircleBody({ cx: 8, cy: 5.5, radius: .5 }, { scene: overlay }),
            gestures: { tap: () => { stage.clearOverlay(); stage.score.winLevel(); return true; } },
        });

        // A "cheat" button that makes you lose right away
        new Actor({
            appearance: new ImageSprite({ width: 1, height: 1, img: "red_ball.png" }),
            rigidBody: new CircleBody({ cx: 8, cy: 6.5, radius: .5 }, { scene: overlay }),
            gestures: { tap: () => { stage.clearOverlay(); stage.score.loseLevel(); return true; } },
        });

        // A mystery button.  It opens *another* pause scene, by hiding this one and
        // installing a new one.
        //
        // One very cool thing is that you can change the *world* from within the
        // pause scene.  In this case, we'll give the hero strength, so it can
        // withstand collisions with enemies.
        new Actor({
            appearance: new ImageSprite({ width: 1, height: 1, img: "purple_ball.png" }),
            rigidBody: new CircleBody({ cx: 8, cy: 7.5, radius: .5 }, { scene: overlay }),
            gestures: {
                tap: () => {
                    // clear the pause scene, draw another one
                    stage.clearOverlay();
                    stage.requestOverlay((overlay: Scene) => {
                        // This one just has one button that boosts the hero's strength and returns to the game
                        new Actor({
                            appearance: new ImageSprite({ width: 1, height: 1, img: "purple_ball.png" }),
                            rigidBody: new CircleBody({ cx: 8, cy: 4.5, radius: .5 }, { scene: overlay }),
                            gestures: {
                                tap: () => {
                                    (h.role as Hero).strength = 10;
                                    stage.clearOverlay();
                                    return true;
                                }
                            }
                        });
                    }, false);
                    return true;
                }
            }
        });
    }, true);
}

/**
 * Create an overlay (blocking all game progress) consisting of a black screen
 * with text.  Clearing the overlay will start the next level.
 *
 * @param message A message to display in the middle of the screen
 */
function winMessage(message: string) {
    stage.score.winSceneBuilder = (overlay: Scene) => {
        new Actor({
            appearance: new FilledBox({ width: 16, height: 9, fillColor: "#000000" }),
            rigidBody: new BoxBody({ cx: 8, cy: 4.5, width: 16, height: 9 }, { scene: overlay }),
            gestures: {
                tap: () => {
                    stage.clearOverlay();
                    stage.switchTo(stage.score.onWin.builder, stage.score.onWin.level);
                    return true;
                }
            },
        });
        new Actor({
            appearance: new TextSprite({ center: true, face: "Arial", color: "#FFFFFF", size: 28, z: 0 }, message),
            rigidBody: new BoxBody({ cx: 8, cy: 4.5, width: .1, height: .1 }, { scene: overlay }),
        });
    };
}

/**
 * Create an overlay (blocking all game progress) consisting of a black screen
 * with text.  Clearing the overlay will restart the level.
 *
 * @param message A message to display in the middle of the screen
 */
function loseMessage(message: string) {
    stage.score.loseSceneBuilder = (overlay: Scene) => {
        new Actor({
            appearance: new FilledBox({ width: 16, height: 9, fillColor: "#000000" }),
            rigidBody: new BoxBody({ cx: 8, cy: 4.5, width: 16, height: 9 }, { scene: overlay }),
            gestures: {
                tap: () => {
                    stage.clearOverlay();
                    stage.switchTo(stage.score.onLose.builder, stage.score.onLose.level);
                    return true;
                }
            },
        });
        new Actor({
            appearance: new TextSprite({ center: true, face: "Arial", color: "#FFFFFF", size: 28, z: 0 }, message),
            rigidBody: new BoxBody({ cx: 8, cy: 4.5, width: .1, height: .1 }, { scene: overlay }),
        })
    };
}

