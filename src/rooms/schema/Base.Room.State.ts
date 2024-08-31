import { Schema, Context, type, MapSchema } from "@colyseus/schema";
import { Player } from "./Base.Player";

export class BaseRoomState extends Schema {

  @type({map:Player}) players = new MapSchema<Player>();

}
