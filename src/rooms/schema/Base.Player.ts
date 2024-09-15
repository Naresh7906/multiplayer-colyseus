import { Schema, Context, type, MapSchema } from "@colyseus/schema";
import { BasePlayerVector } from "./Base.Player.Vector";
import { PlayerMetaDataModelObject } from "../../models/player.metadata.model";

export class Player extends Schema {

  @type(BasePlayerVector) rotation = new BasePlayerVector();
  @type(BasePlayerVector) position = new BasePlayerVector();
  @type('string') animation : string = "idle";
  playerMetaDataModel : PlayerMetaDataModelObject = new PlayerMetaDataModelObject();

  static fromPlayerMovements(params:PlayerMovementModel, playerMeataData : PlayerMetaDataModelObject): Player {
    const player = new Player();
    player.rotation = BasePlayerVector.fromVectorModel(params.rotation);
    player.position = BasePlayerVector.fromVectorModel(params.position);
    player.animation = params.animation;
    player.playerMetaDataModel = playerMeataData
    return player;
  }

}
