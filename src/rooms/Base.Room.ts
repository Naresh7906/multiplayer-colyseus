import { Room, Client } from "@colyseus/core";
import { BaseRoomState } from "./schema/Base.Room.State";
import { Player } from "./schema/Base.Player";

export class BaseRoom extends Room<BaseRoomState> {
  maxClients = 4;

  onCreate (options: any) {
    this.setState(new BaseRoomState());

    this.onMessage("movement", (client, message : PlayerMovementModel) => {
      this.state.players.set(client.id, Player.fromPlayerMovements(message));
    });
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    const player = new Player();
    this.state.players.set(client.id,player);
    console.log(this.state);
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
