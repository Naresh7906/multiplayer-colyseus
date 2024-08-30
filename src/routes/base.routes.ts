import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";
import express from "express";
import { baseUtilities } from "../utilities/base.utilities";
import helmet from "helmet";

export function baseRoutes(app: express.Express) {

    app.use(helmet());
  /**
   * Bind your custom express routes here:
   * Read more: https://expressjs.com/en/starter/basic-routing.html
   */
  app.get("/hello_world", (req, res) => {
    res.send("It's time to kick ass and chew bubblegum!");
  });

  /**
   * Use @colyseus/playground
   * (It is not recommended to expose this route in a production environment)
   */
  if (process.env.NODE_ENV !== "production") {
    app.use("/", playground);
  }

  /**
   * Use @colyseus/monitor
   * It is recommended to protect this route with a password
   * Read more: https://docs.colyseus.io/tools/monitor/#restrict-access-to-the-panel-using-a-password
   */
  app.use("/colyseus", monitor());

  app.get("/health", (req, res) => {
    res.status(200).send(baseUtilities.messageBuilder("Server Running"));
  });
}
