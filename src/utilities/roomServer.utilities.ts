import { Server } from "colyseus";
import { BaseRoom } from "../rooms/Base.Room";

const roomServer = (gameServer : Server) => {

    gameServer.define('base_room', BaseRoom).filterBy(['roomId']);

}

export {roomServer}