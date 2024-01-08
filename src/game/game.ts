import { JetLagGameConfig } from "../jetlag/Config";
import { initializeAndLaunch } from "../jetlag/Stage";
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
  storageKey = "--no-key--";
  hitBoxes = true;
  resourcePrefix = "./assets/";
  musicNames = [];
  soundNames = [];
  imageNames = ["pcPortrait.png", "npcPortrait.png", "collect.png", "back_arrow.png", "right_arrow.png", "left_arrow.png", "level_tile.png", "audio_off.png", "audio_on.png", "playerCharacter.png", "pushBox.png", "target.png", "locked.png", "unlocked.png"];
}

// call the function that kicks off the game
initializeAndLaunch("game-player", new Config(), splashBuilder);