import { stage } from "../jetlag/Stage";
import { Scene } from "../jetlag/Entities/Scene";
import { FilledBox, ImageSprite, TextSprite } from "../jetlag/Components/Appearance";
import { Actor } from "../jetlag/Entities/Actor";
import { BoxBody } from "../jetlag/Components/RigidBody";
import { Obstacle } from "../jetlag/Components/Role";
import { createRestartButton } from "./common";
import { splashBuilder } from "./splash";
import { KeyCodes } from "../jetlag/Services/Keyboard";
import { pauseGame } from "./pause";
import { levelOne } from "./levels.ts/levelOne";
import { levelTwo } from "./levels.ts/levelTwo";
import { levelThree } from "./levels.ts/levelThree";
import { levelFour } from "./levels.ts/levelFour";
import { levelFive } from "./levels.ts/levelFive";
import { testingLevel } from "./levels.ts/testingLevek"


/**
 * gameBuilder is for drawing the playable levels of the game
 * @param level Which level should be displayed
 */
export function gameBuilder(level: number) {
    //variable - if pause screen then change the pause screen handler
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_ESCAPE, () => (pauseGame(level)));

    createRestartButton({ scene: stage.hud, x: 15, y: 1.5, width: 1, height: 1 });
    createBoundary();
    drawBackground();

    // Make sure we go to the correct level when this level is won/lost: for
    // anything but the last level, we go to the next level.  Otherwise, go to the splash screen
    if (level != 5) {
        stage.score.onLose = { level: level, builder: gameBuilder };
        stage.score.onWin = { level: level + 1, builder: gameBuilder };
    }
    else {
        stage.score.onLose = { level: level, builder: gameBuilder };
        stage.score.onWin = { level: 1, builder: splashBuilder };
    }

    if (level == -1) {
        testingLevel(stage)
    }

    if (level == 1) {
        levelOne(stage)
    }

    //note to future level makers
    //remember to add
    //stage.score.setVictoryGoodies(2, 0, 0, 0)
    //or some other form of winning the level

    if (level == 2) {
        levelTwo(stage)
    }
    if (level == 3) {
        levelThree(stage)
    }
    if (level == 4) {
        levelFour(stage)
    }
    if (level == 5) {
        levelFive(stage)
    }

}

function drawBackground() {
    let backgroundTiles = ["tile_1.png", "tile_2.png"]
    for (let x = 0; x <= 16; x += 1) {
        for (let y = 0; y <= 9; y += 1) {
            new Actor({
                appearance: new ImageSprite({ width: 1, height: 1, img: backgroundTiles[((x + (y % 2)) % 2)], z: -1 }),
                rigidBody: new BoxBody({ cx: x, cy: y, width: 1, height: 1 }, { collisionsEnabled: false }),
            });
        }
    }
}

function createBoundary() {
    // Every level will have some common configuration stuff.  We'll put it all
    // here, at the top.  Some of it relies on functions that are at the end of
    // this file.
    // Draw four walls, covering the four borders of the world
    new Actor({
        appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
        rigidBody: new BoxBody({ cx: 8, cy: -.05, width: 16, height: .1 }),
        role: new Obstacle(),
        extra: { isWall: true }
    });
    new Actor({
        appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
        rigidBody: new BoxBody({ cx: 8, cy: 9.05, width: 16, height: .1 }),
        role: new Obstacle(),
        extra: { isWall: true }
    });
    new Actor({
        appearance: new FilledBox({ width: .1, height: 9, fillColor: "#ff0000" }),
        rigidBody: new BoxBody({ cx: -.05, cy: 4.5, width: .1, height: 9 }),
        role: new Obstacle(),
        extra: { isWall: true }
    });
    new Actor({
        appearance: new FilledBox({ width: .1, height: 9, fillColor: "#ff0000" }),
        rigidBody: new BoxBody({ cx: 16.05, cy: 4.5, width: .1, height: 9 }),
        role: new Obstacle(),
        extra: { isWall: true }
    });
}

/**
 * Create an overlay (blocking all game progress) consisting of a black screen
 * with text.  Clearing the overlay will resume the current level.  This will
 * show immediately when the game starts.
 *
 * @param message A message to display in the middle of the screen
 */
export function welcomeMessage(message: string) {
    // Immediately install the overlay, to pause the game
    stage.requestOverlay((overlay: Scene) => {
        // Pressing anywhere on the black background will make the overlay go away
        /*
        new Actor({
            appearance: new FilledBox({ width: 16, height: 9, fillColor: "#000000" }),
            rigidBody: new BoxBody({ cx: 8, cy: 4.5, width: 16, height: 9 }, { scene: overlay }),
            gestures: {
                tap: () => {
                    stage.clearOverlay();
                    return true;
                }
            },
        });*/
        new Actor({
            appearance: new ImageSprite({ width: 16, height: 9, img: "colored_blank_title.png" }),
            rigidBody: new BoxBody({ cx: 8, cy: 4.5, width: 16, height: 9 }, { scene: overlay }),
            gestures: {
                tap: () => {
                    stage.clearOverlay();
                    return true;
                }
            },
        })
        // The text goes in the middle
        new Actor({
            rigidBody: new BoxBody({ cx: 8, cy: 4.5, width: .1, height: .1 }, { scene: overlay }),
            appearance: new TextSprite({ center: true, face: "Arial", color: "#FFFFFF", size: 28, z: 0 }, () => message),
        });
    }, false);
}



/**
 * Create an overlay (blocking all game progress) consisting of a black screen
 * with text.  Clearing the overlay will start the next level.
 *
 * @param message A message to display in the middle of the screen
 */
/*
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

* /*/