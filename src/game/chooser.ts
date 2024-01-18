import { Actor } from "../jetlag/Entities/Actor";
import { ImageSprite } from "../jetlag/Components/Appearance";
import { stage } from "../jetlag/Stage";
import { BoxBody } from "../jetlag/Components/RigidBody";
import { splashBuilder } from "./splash";
import { gameBuilder } from "./play";
import { persist, PStore } from "./common";


/**
 * buildChooserScreen draws the level chooser screens.
 *
 * Since we have 9 levels, and we show 4 levels per screen, our chooser
 * will have 3 screens.
 *
 * @param level Which screen of the chooser should be displayed
 */
export function chooserBuilder(level: number) {
    // start the chooser music, pause the game music
    //  stage.levelMusic = new MusicComponent(stage.musicLibrary.getMusic("tune.ogg"));
    //  stage.gameMusic?.pause();

    // Paint the background white
    stage.backgroundColor = "#FFFFFF";

    let levelsBeat = 0;
    if (stage.storage.getPersistent("persistent_info") == undefined) {
        levelsBeat = 0;
        persist(new PStore(), "persistent_info"); // explicitly save it back
    }
    let pstore = JSON.parse(stage.storage.getPersistent("persistent_info")!) as PStore;

    //console.log(pstore)


    // Draw some buttons, based on which chooser "level" we're on
    //im sure there is a better way of doing this
    if (level == 1) {
        //drawLevelButton(14, 1, -1, 0)

        // Levels 1-4
        if (pstore.levelsBeat >= 0) {
            drawLevelButton(2, 4, 1, 0);
        }
        if (pstore.levelsBeat >= 1) {
            drawLevelButton(8, 4, 2, 1);
        }
        if (pstore.levelsBeat >= 2) {
            drawLevelButton(14, 4, 3, 2);
        }
        if (pstore.levelsBeat >= 3) {
            drawLevelButton(5, 7, 4, 3);
        }
        if (pstore.levelsBeat >= 4) {
            drawLevelButton(11, 7, 5, 4);
        }
    }

    /*  else if (level == 2) {
          // Levels 5-8
          drawLevelButton(11, 4, 6);
          drawLevelButton(5, 7, 7);
          drawLevelButton(11, 7, 8);
      }
  
      else {
          // Level 9
          drawLevelButton(8, 5.5, 9);
      }
  */
    /*
        // Add a button for going to the next chooser screen, but only if this isn't
        // the last chooser screen
        if (level < 3) {
            new Actor({
                appearance: new ImageSprite({ width: 1, height: 1, img: "right_arrow.png" }),
                rigidBody: new BoxBody({ width: 1, height: 1, cx: 15.5, cy: 5.625 }),
                gestures: { tap: () => { stage.switchTo(chooserBuilder, level + 1); return true; } }
            });
        }
        // Add a button for going to the previous chooser screen, but only if this
        // isn't the first chooser screen
        if (level > 1) {
            new Actor({
                appearance: new ImageSprite({ width: 1, height: 1, img: "left_arrow.png" }),
                rigidBody: new BoxBody({ width: 1, height: 1, cx: .5, cy: 5.625 }),
                gestures: { tap: () => { stage.switchTo(chooserBuilder, level - 1); return true; } }
            });
        }
    */
    // Add a button for returning to the splash screen
    new Actor({
        appearance: new ImageSprite({ width: 1, height: 1, img: "back_button.png" }),
        rigidBody: new BoxBody({ width: 1, height: 1, cx: 15.5, cy: 8.5 }),
        gestures: { tap: () => { stage.switchTo(splashBuilder, 1); return true; } }
    });
}

/**
 * Draw a button for that jumps to a level when tapped
 *
 * @param cx    X coordinate of the center of the button
 * @param cy    Y coordinate of the center of the button
 * @param level which level to play when the button is tapped
 */
function drawLevelButton(cx: number, cy: number, level: number, levelButtonAssetNamesIndex: number) {
    let levelButtonAssetNames = ["level_1_button.png", "level_2_button.png", "level_3_button.png", "level_4_button.png", "level_5_button.png"]

    // Drawing a tile.  Touching it goes to a level.
    new Actor({
        appearance: new ImageSprite({ width: 2, height: 2, img: levelButtonAssetNames[levelButtonAssetNamesIndex] }),
        rigidBody: new BoxBody({ cx, cy, width: 2, height: 2 }),
        gestures: { tap: () => { stage.switchTo(gameBuilder, level); return true; } }
    });
    //    // Put some text over it
    //    new Actor({
    //        appearance: new TextSprite({ center: true, face: "Arial", color: "#FFFFFF", size: 56, z: 0 }, () => level + ""),
    //        rigidBody: new BoxBody({ cx, cy, width: .1, height: .1 }),
    //    });

    new Actor({
        appearance: new ImageSprite({ width: 16, height: 9, img: "colored_blank_title.png", z: -1 }),
        rigidBody: new BoxBody({ cx: 8, cy: 4.5, width: 16, height: 9 })
    })
}