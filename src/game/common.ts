import { ImageSprite } from "../jetlag/Components/Appearance";
import { BoxBody } from "../jetlag/Components/RigidBody";
import { Actor } from "../jetlag/Entities/Actor";
import { Scene } from "../jetlag/Entities/Scene";
import { stage } from "../jetlag/Stage";

/** This is for Persistent Storage.  It shouldn't have any methods */
export class PStore {
    levelsBeat = 0;
}

/** Save a PStore */
export function persist(p: PStore, key: string) {
    stage.storage.setPersistent(key, JSON.stringify(p))
}

/** This is for Session Storage */
export class SStore {
    pauseMusicDuration = 0;
}

/***
 * function to play a video cutscene
 * assumes everything is an mp4 and also in the assets folder
 * @param sourceName the name of the mp4 video in the assets folder 
 */
export function videoCutscene(sourceName: string) {
    //https://stackoverflow.com/questions/5235145/changing-source-on-html5-video-tag

    //the HTML elements
    let vPlayer = document.getElementById("videoPlayer") //this is the div that has the video
    let gPlayer = document.getElementById("game-player") //this is the div that has the game
    let myVideo = document.getElementById("video") as HTMLVideoElement //this is the video element

    //remove the old video
    while (myVideo.firstChild) {
        myVideo.removeChild(myVideo.firstChild);
    }

    //create the source (the video we want to play)
    var source = document.createElement('source');

    //set the source to play the video
    source.setAttribute('src', "assets/" + sourceName);
    source.setAttribute('type', 'video/mp4');

    //load the video
    myVideo.load();

    //this handles switching divs to the video player
    if (myVideo != null && vPlayer != null && gPlayer != null) {
        //we want to make sure that the video respects the user's volume choice
        let getVolume = () => (stage.storage.getPersistent("volume") ?? "1") === "1";
        //set the hidden div to visable
        vPlayer.style.visibility = 'visible'

        //this does something important because it doesn't work wihtout it
        myVideo.appendChild(source);

        //play unmuted
        if (getVolume()) {
            //console.log("pausing music")
            stage.gameMusic?.pause()
            myVideo.onloadedmetadata = function () {
                let duration = myVideo.duration
                //console.log("video duration: " + duration)
                setTimeout(function () {
                    //console.log("unpausing music after " + duration)
                    stage.gameMusic?.play()
                }, duration * 1000)
            };
            gPlayer.style.display = "none"; vPlayer.style.display = "block"; myVideo.currentTime = 0; myVideo.autoplay = true; myVideo.muted = false; myVideo.play();



        }
        //play muted
        else {
            gPlayer.style.display = "none"; vPlayer.style.display = "block"; myVideo.currentTime = 0; myVideo.autoplay = true; myVideo.muted = true; myVideo.play();
        }

    }


}


/**
 * Draw a mute button
 *
 * @param cfg         Configuration for how to draw the button
 * @param cfg.scene   The scene where the button should be drawn
 * @param cfg.cx      The center X coordinate of the button
 * @param cfg.cy      The center Y coordinate of the button
 * @param cfg.width   The width of the button
 * @param cfg.height  The height of the button
 */
export function drawMuteButton(cfg: { cx: number, cy: number, width: number, height: number, scene: Scene }) {
    // Draw a mute button
    let getVolume = () => (stage.storage.getPersistent("volume") ?? "1") === "1";
    let mute = new Actor({
        appearance: new ImageSprite({ width: cfg.width, height: cfg.height, img: "unmute_button.png" }),
        rigidBody: new BoxBody({ cx: cfg.cx, cy: cfg.cy, width: cfg.width, height: cfg.height }, { scene: cfg.scene }),
    });
    // If the game is not muted, switch the image
    if (getVolume())
        (mute.appearance as ImageSprite).setImage("mute_button.png");
    // when the obstacle is touched, switch the mute state and update the picture
    mute.gestures = {
        tap: () => {
            // volume is either 1 or 0, switch it to the other and save it
            let volume = 1 - parseInt(stage.storage.getPersistent("volume") ?? "1");
            stage.storage.setPersistent("volume", "" + volume);
            // update all music
            stage.musicLibrary.resetMusicVolume(volume);

            if (getVolume()) (mute.appearance as ImageSprite).setImage("mute_button.png");
            else (mute.appearance as ImageSprite).setImage("unmute_button.png");
            return true;
        }
    };
}



/***
 * Draw a restart button
 * 
 * @param cfg         Configuration for how to draw the button
 * @param cfg.scene   The scene where the button should be drawn
 * @param cfg.x      The center X coordinate of the button
 * @param cfg.y      The center Y coordinate of the button
 * @param cfg.width   The width of the button
 * @param cfg.height  The height of the button
 */
export function createRestartButton(cfg: { scene: Scene, x: number, y: number, width: number, height: number }) {
    new Actor({
        appearance: new ImageSprite({ width: 1, height: 1, img: "restart1.png" }),
        rigidBody: new BoxBody({ cx: cfg.x, cy: cfg.y, height: cfg.height, width: cfg.width }, { scene: cfg.scene }),
        gestures: { tap: () => { stage.score.loseLevel(); return true } }
    })

}