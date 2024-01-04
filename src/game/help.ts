import { Actor } from "../jetlag/Entities/Actor";
import { FilledBox, ImageSprite, TextSprite } from "../jetlag/Components/Appearance";
import { stage } from "../jetlag/Stage";
import { BoxBody, CircleBody } from "../jetlag/Components/RigidBody";
import { splashBuilder } from "./splash";

/**
 * helpBuilder is for drawing the help screens.  These are no different from
 * game screens... except that you probably don't want them to involve "winning"
 * and "losing". 
 *
 * In this demonstration, we just provide a bit of information about the demo
 * game, and how to get started.  This is also often a good place to put
 * credits.
 *
 * For the purposes of this demonstration, there are two Help screens.  That
 * way, we can show how to move from one to the next.
 *
 * @param level Which help screen should be displayed
 */
export function helpBuilder(level: number) {

}