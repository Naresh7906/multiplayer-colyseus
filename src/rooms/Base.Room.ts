import { Room, Client } from "@colyseus/core";
import { BaseRoomState } from "./schema/Base.Room.State";
import { Player } from "./schema/Base.Player";
import { getUserInfoFromDB } from "../services/base/user.base.services";
import { PlayerMetaDataModelObject } from "../models/player.metadata.model";

export class BaseRoom extends Room<BaseRoomState> {
  maxClients = 4;

  onCreate (options: any) {
    this.setState(new BaseRoomState());

    this.onMessage("movement", (client, message : PlayerMovementModel) => {
      this.state.players.set(client.id, Player.fromPlayerMovements(message, this.state.players.get(client.id).playerMetaDataModel));
    });
  }

  async onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    const player = new Player();
    const playerMetaData : PlayerMetaDataModelObject  = new PlayerMetaDataModelObject();
    let data = await getUserInfoFromDB(options.userId);
    playerMetaData.setData(data);
    player.playerMetaDataModel = playerMetaData;
    this.state.players.set(client.id,player);
    console.log(this.state.players.get(client.id).playerMetaDataModel);
    client.send('initComplete', this.state.players.get(client.id));
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
