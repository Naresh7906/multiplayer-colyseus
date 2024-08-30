import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { checkAuth, PS, scopes } from "../services/passport/passport.service";
import { messageBuilder } from "../utilities/base.utilities";
import session from "express-session";
import { envConfig } from "../config/env.config";

export function baseRoutes(app: express.Express) {
  initializeApp(app);
  app.get("/hello_world", (req, res) => {
    res.send("It's time to kick ass and chew bubblegum!");
  });
  if (process.env.NODE_ENV !== "production") {
    app.use("/playground", playground);
  }
  app.use("/colyseus", monitor());

  app.get("/health", (req, res) => {
    res.status(200).send(messageBuilder("Server Running"));
  });
  app.get(
    "/",
    PS.authenticate("discord", (req:Request, res:Response) =>{})
  );
  app.get(
    "/login",
    PS.authenticate("discord", (req:any, res:any) =>{
    })
  );
  app.get(
    "/callback",
    PS.authenticate("discord", { failureRedirect: "/" }),
    function (req, res) {
      res.redirect("/info");
    } // auth success
  );
  app.get("/logout", (req, res) => {
      req.logout(
        (error)=>{
            console.error("Unable to logout user", error)
            res.status(500).send(messageBuilder(null,true,error))
        }
      );
      res.redirect("/");
  });
  app.get("/info", checkAuth, function (req, res) {
    //console.log(req.user)
    res.json(req.user);
  });
}

function initializeApp(app: express.Express) {
  app.use(helmet());
  app.use(cors());
  app.use(session({ secret:envConfig.SESSION_SECRET, resave: false, saveUninitialized: false }));
  app.use(PS.initialize());
  app.use(PS.session());
}
