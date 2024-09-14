import config from "@colyseus/tools";

import { baseRoutes } from "./routes/base.routes";
import { BaseRoom } from "./rooms/Base.Room";
import { mongooseService } from "./services/database/mongoose.service";

export default config({

    initializeGameServer: (gameServer) => {

        gameServer.define('base_room', BaseRoom);

    },

    initializeExpress: baseRoutes,


    beforeListen: async () => {
        console.log("Connecting to MongoDB");
        mongooseService;
    }
});
