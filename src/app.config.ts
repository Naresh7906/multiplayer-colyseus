import config from "@colyseus/tools";

/**
 * Import your Room files
 */
import { baseRoutes } from "./routes/base.routes";
import { BaseRoom } from "./rooms/Base.Room";
import mongoose from "mongoose";
import { envConfig } from "./config/env.config";

export default config({

    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer.define('base_room', BaseRoom);

    },

    initializeExpress: baseRoutes,


    beforeListen: async () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }
});
