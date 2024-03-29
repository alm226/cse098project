import { ImageSprite } from "../../jetlag/Components/Appearance";
import { BoxBody } from "../../jetlag/Components/RigidBody";
import { Obstacle, Goodie } from "../../jetlag/Components/Role";
import { Actor } from "../../jetlag/Entities/Actor";
import { Stage } from "../../jetlag/Stage";
import { PStore, persist, videoCutscene } from "../common";
import { createLockedWall } from "../lockedWall";
import { welcomeMessage } from "../play";
import { createPlayer } from "../playerCharacter";
import { createPushBox } from "../pushBox";
import { createTarget } from "../target";
import { textbox } from "../textbox";


export function levelOne(stage: Stage) {

    stage.score.setVictoryGoodies(2, 0, 0, 0)
    //16x9
    //there's still a lot you can't do with the basic editor
    //it just places boxes and walls rn
    //but it can be useful to plot out a level here or something
    //b = box
    //# = wall
    //H = player character (you have to add this yourself)
    //! = target           (you have to add this yourself)
    //1 = locked wall      (you have to add this yourself)
    //@ = Level exit       (you may have to add this yourself if you want to tweak it)
    //O = NPC              (you may as well add this yourself tbh)
    const levelLayout = [
        "#################",
        "#H              #",
        "#      b        #",
        "#               #",
        "#      !        #",
        "#               #",
        "#               #",
        "#######1#########",
        "#@             O#",
        "#################",
    ];

    createPlayer(2, 1, [8]);

    // Create walls and goodies from the `levelLayout`
    for (let row = 0; row < levelLayout.length; row++) {
        for (let col = 0; col < levelLayout[row].length; col++) {
            if (levelLayout[row][col] === "#") {
                new Actor({
                    rigidBody: new BoxBody({ cx: col, cy: row, width: 1, height: 1 }),
                    //appearance: new FilledBox({ width: 1, height: 1, fillColor: "#ffffff" }),
                    appearance: new ImageSprite({ width: 1, height: 1, img: "wall_tile.png" }),
                    role: new Obstacle(),
                    extra: { isWall: true }
                });
            }
            else if (levelLayout[row][col] === "b") {
                createPushBox(col, row, [7], true)
            }

            else if (levelLayout[row][col] === "@") {
                //this will be wherever the end level is
                //potentially stairs? idk
                new Actor({
                    appearance: new ImageSprite({ width: 0.8, height: 0.8, img: "endLevel.png" }),
                    rigidBody: new BoxBody({ cx: col, cy: row, width: 0.8, height: 0.8 }),
                    role: new Goodie({
                        onCollect: () => {
                            //make the user aware if they missed something
                            if (stage.score.getGoodieCount(0) == 0) {
                                //array of messages. 
                                let messages = [
                                    "Wait!",
                                    "Please don't go",
                                    "What's going on??",
                                    ":(",
                                    "sorry"
                                ]
                                //order of portraits
                                let order = [0, 0, 0, 0, 1]

                                textbox(messages, ["npcPortrait.png", "pcPortrait.png"], order);
                                return false
                            }
                            //satisfy the win condition to move on

                            videoCutscene("pre2Cutscene.mp4")

                            stage.score.setGoodieCount(0, 2)
                            let pstore = JSON.parse(stage.storage.getPersistent("persistent_info")!) as PStore
                            if (pstore.levelsBeat < 1) {
                                pstore.levelsBeat = 1;
                            }
                            persist(pstore, "persistent_info");
                            return true;
                        }
                    }),
                    extra: { isNPC: true }
                })
            }

            else if (levelLayout[row][col] === "O") {
                new Actor({
                    //obviously all the programmer art is temporary
                    //but "collect.png" should be replaced with something specific whenever this code is used
                    appearance: new ImageSprite({ width: 1, height: 1, img: "astral_sprite_npc.png" }),
                    rigidBody: new BoxBody({ cx: col, cy: row, width: 1, height: 1 }),
                    role: new Goodie({
                        onCollect: () => {
                            stage.score.setGoodieCount(0, 1);
                            //array of messages. 
                            let messages = [
                                "What was that???",
                                "Something went wrong \nwith the power source.",
                                "We're so fired",
                                "We'll have bigger problems \nif we don't fix it..."
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
            }
        }
    }

    let lockedWall = createLockedWall(7, 7);
    createTarget(7, 4, [7], lockedWall);



    welcomeMessage("Level one");
}