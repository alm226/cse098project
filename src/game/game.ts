import { JetLagGameConfig } from "../jetlag/Config";
import { initializeAndLaunch, stage } from "../jetlag/Stage";
import { splashBuilder } from "./splash";

/**
 * Screen dimensions and other game configuration, such as the names of all
 * the assets (images and sounds) used by this game.
 */
class Config implements JetLagGameConfig {
  pixelMeterRatio = 100;
  screenDimensions = { width: 1600, height: 900 };
  adaptToScreenSize = true;
  canVibrate = true;
  forceAccelerometerOff = true;
  storageKey = "com.github.alm226.cse098project";
  hitBoxes = true;
  resourcePrefix = "./assets/";
  musicNames = ["Dystopian.wav"];
  soundNames = [];
  imageNames = ["tile_1.png", "tile_2.png", "key.png", "pause.png", "restart.png", "endLevel.png",
    "pcPortrait.png", "npcPortrait.png", "collect.png", "back_arrow.png", "right_arrow.png",
    "left_arrow.png", "level_tile.png", "audio_off.png", "audio_on.png", "playerCharacter.png",
    "pushBox.png", "target.png", "locked.png", "unlocked.png", "restart1.png",
    "mute_button.png", "unmute_button.png", "back_button.png", "moveable_block.png",
    "wall_tile.png", "stairs_tile.png", "astral_sprite_npc.png", "level_1_button.png",
    "level_2_button.png", "level_3_button.png", "level_4_button.png", "level_5_button.png", "play_button.png",
    "Delete_data_button.png", "Credits_button.png"];
}





// call the function that kicks off the game
initializeAndLaunch("game-player", new Config(), splashBuilder);