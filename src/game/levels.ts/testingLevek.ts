import { FilledBox, ImageSprite } from "../../jetlag/Components/Appearance";
import { MusicComponent } from "../../jetlag/Components/Music";
import { BoxBody } from "../../jetlag/Components/RigidBody";
import { Obstacle, Goodie } from "../../jetlag/Components/Role";
import { Actor } from "../../jetlag/Entities/Actor";
import { Stage } from "../../jetlag/Stage";
import { PStore, persist } from "../common";
import { createLockedWall } from "../lockedWall";
import { welcomeMessage } from "../play";
import { createPlayer } from "../playerCharacter";
import { createPushBox } from "../pushBox";
import { createTarget } from "../target";
import { textbox } from "../textbox";

export function testingLevel(stage: Stage) {

    // start the music
    if (stage.gameMusic === undefined)
        stage.gameMusic = new MusicComponent(stage.musicLibrary.getMusic("Dystopian.wav"));
    stage.gameMusic.play();


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
        appearance: new FilledBox({ width: 7, height: 0.8, fillColor: "#00ff00" }),
        rigidBody: new BoxBody({ cx: 4, cy: 4, width: 7, height: 0.8 }, { kinematic: false, dynamic: false }),
        role: new Obstacle(),
        extra: {
            isWall: true
        }
    });

    //Wall
    //idealy there should be more of them
    //in some sort of puzzle formation
    new Actor({
        appearance: new FilledBox({ width: 8, height: 0.8, fillColor: "#ff0000" }),
        rigidBody: new BoxBody({ cx: 12.8, cy: 4, width: 8, height: 0.8 }, { kinematic: false, dynamic: false }),
        role: new Obstacle(),
        extra: {
            isWall: true
        }
    });


    //create a player character at the coordinates (2,3) on pass through layer 8
    let player = createPlayer(2, 3, [8]);


    //create a pushBox at the coordinates (15,7) on pass through layer 7
    let box = createPushBox(3, 2, [7]);
    createPushBox(3, 4, [7])

    //create a locked wall at the coorinates (5,7)
    let lockedWall = createLockedWall(8, 4);

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

        }),
        extra: {
            isNPC: true
        }
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
                let pstore = JSON.parse(stage.storage.getPersistent("persistent_info")!) as PStore
                pstore.levelsBeat++;
                persist(pstore, "persistent_info");
                return true;
            }
        }),
        extra: { isNPC: true }
    })


    welcomeMessage("test level\nwip");
}