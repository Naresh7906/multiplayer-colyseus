import config from "@colyseus/tools";

import { baseRoutes } from "./routes/base.routes";
import { BaseRoom } from "./rooms/Base.Room";
import { mongooseService } from "./services/database/mongoose.service";
import { roomServer } from "./utilities/roomServer.utilities";

export default config({

    initializeGameServer: roomServer,

    initializeExpress: baseRoutes,


    beforeListen: async () => {
        console.log("Connecting to MongoDB");
        mongooseService;
    }
});
