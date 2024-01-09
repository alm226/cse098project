import { stage } from "../jetlag/Stage";
import { Scene } from "../jetlag/Entities/Scene";
import { FilledBox, ImageSprite, TextSprite } from "../jetlag/Components/Appearance";
import { Actor } from "../jetlag/Entities/Actor";
import { BoxBody, CircleBody } from "../jetlag/Components/RigidBody";
import { Goodie, Hero, Obstacle } from "../jetlag/Components/Role";
import { chooserBuilder } from "./chooser";
import { createRestartButton, drawMuteButton } from "./common";
import { createPlayer } from "./playerCharacter"
import { createPushBox } from "./pushBox"
import { createLockedWall } from "./lockedWall";
import { createTarget } from "./target";
import { textbox } from "./textbox";
import { splashBuilder } from "./splash";
import { KeyCodes } from "../jetlag/Services/Keyboard";
import { pauseGame } from "./pause";


/**
 * gameBuilder is for drawing the playable levels of the game
 * @param level Which level should be displayed
 */
export function gameBuilder(level: number) {
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_ESCAPE, () => (pauseGame(level)));

    createRestartButton({ scene: stage.hud, x: 15, y: 1.5, width: 1, height: 1 });
    createBoundary();

    // Make sure we go to the correct level when this level is won/lost: for
    // anything but the last level, we go to the next level.  Otherwise, go to the splash screen
    if (level != 2) {
        stage.score.onLose = { level: level, builder: gameBuilder };
        stage.score.onWin = { level: level + 1, builder: gameBuilder };
    }
    else {
        stage.score.onLose = { level: level, builder: gameBuilder };
        stage.score.onWin = { level: 1, builder: splashBuilder };
    }

    if (level == 1) {
        stage.score.setVictoryGoodies(2, 0, 0, 0)

        //something to consider:
        //right now the lockable/unlockable wall is the same size as the player
        //which is not a big issue but it may be a little annoying to manuver through
        //so it may benefit from slightly shrinking the rigidBodies of the walls
        //slightly without changing the appearence to give the impression of more tolerance

        //Wall
        //idealy there should be more of them
        //in some sort of puzzle formation
        new Actor({
            appearance: new FilledBox({ width: 8, height: 0.8, fillColor: "#00ff00" }),
            rigidBody: new BoxBody({ cx: 4, cy: 4, width: 8, height: 0.8 }, { kinematic: false, dynamic: false }),
            role: new Obstacle(),
        });

        //Wall
        //idealy there should be more of them
        //in some sort of puzzle formation
        new Actor({
            appearance: new FilledBox({ width: 8, height: 0.8, fillColor: "#ff0000" }),
            rigidBody: new BoxBody({ cx: 12.8, cy: 4, width: 8, height: 0.8 }, { kinematic: false, dynamic: false }),
            role: new Obstacle(),
        });


        //create a player character at the coordinates (2,3) on pass through layer 8
        let player = createPlayer(2, 3, [8]);


        //create a pushBox at the coordinates (15,7) on pass through layer 7
        let box = createPushBox(3, 1, [7]);

        //create a locked wall at the coorinates (5,7)
        let lockedWall = createLockedWall(8.4, 4);

        //create a target at coordinates (14,3) which is receptive to box and unlocks lockedWall
        let target = createTarget(14, 3, [7], lockedWall);

        //create a general purpose collectable
        //potential ideas are a lab co-worker for lore dispensing
        //or equipment to fix 
        //or papers to read
        //the possibilities are endless
        let collect = new Actor({
            //obviously all the programmer art is temporary
            //but "collect.png" should be replaced with something specific whenever this code is used
            appearance: new ImageSprite({ width: 0.8, height: 0.8, img: "collect.png" }),
            rigidBody: new BoxBody({ cx: 14, cy: 7, width: 0.8, height: 0.8 }),
            role: new Goodie({
                onCollect: () => {
                    stage.score.setGoodieCount(0, 1);
                    //array of messages. 
                    let messages = [
                        "this is a message",
                        "this is a response",
                        " line one\n\tline two",
                        "cool"
                    ]
                    //order of portraits (i.e. portrait 0 says the first line
                    //portrait 1 says the second line, etc)
                    let order = [0, 1, 0, 1]

                    textbox(messages, ["npcPortrait.png", "pcPortrait.png"], order);
                    return true
                }

            })
        })

        //this will be wherever the end level is
        //potentially stairs? idk
        let endLevel = new Actor({
            appearance: new ImageSprite({ width: 0.8, height: 0.8, img: "endLevel.png" }),
            rigidBody: new BoxBody({ cx: 4, cy: 7, width: 0.8, height: 0.8 }),
            role: new Goodie({
                onCollect: () => {
                    //make the user aware if they missed something
                    if (stage.score.getGoodieCount(0) == 0) {
                        //array of messages. 
                        let messages = [
                            "Wait!",
                            "you haven't talked to me yet",
                            "even though i just look like a box",
                            ":(",
                            "sorry"
                        ]
                        //order of portraits
                        let order = [0, 0, 0, 0, 1]

                        textbox(messages, ["npcPortrait.png", "pcPortrait.png"], order);
                        return false
                    }
                    //satisfy the win condition to move on
                    stage.score.setGoodieCount(0, 2)
                    return true
                }

            })
        })


        welcomeMessage("test level\nwip");
    }

    //note to future level makers
    //remember to add
    //stage.score.setVictoryGoodies(2, 0, 0, 0)
    //or some other form of winning the level

    if (level == 2) {
        welcomeMessage("level 2 doesn't exist yet")
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


