import { Schema, Context, type, MapSchema } from "@colyseus/schema";
import { BasePlayerVector } from "./Base.Player.Vector";

export class Player extends Schema {

  @type(BasePlayerVector) rotation = new BasePlayerVector();
  @type(BasePlayerVector) position = new BasePlayerVector();
  @type('string') animation : string = "idle";

  static fromPlayerMovements(params:PlayerMovementModel): Player {
    const player = new Player();
    player.rotation = BasePlayerVector.fromVectorModel(params.rotation);
    player.position = BasePlayerVector.fromVectorModel(params.position);
    player.animation = params.animation;
    return player;
  }

}
