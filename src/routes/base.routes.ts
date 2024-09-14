import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { checkAuth, PS, scopes } from "../services/passport/passport.service";
import { messageBuilder } from "../utilities/base.utilities";
import session from "express-session";
import { envConfig } from "../config/env.config";
import axios from "axios";
import { endpointsConfig } from "../config/endpoints.config";
import mongoose, { Mongoose } from "mongoose";
import {
  DiscordUser,
  getUserDiscordModelFromJson,
  UserDiscordModel,
} from "../models/user.discord.model";
import { mongooseService } from "../services/database/mongoose.service";
import { getUserInfo } from "../services/base/user.base.services";

export async function baseRoutes(app: express.Express) {
  await initializeApp(app);
  if (process.env.NODE_ENV !== "production") {
    app.use("/playground", playground);
  }
  app.use("/colyseus", monitor());

  app.get("/health", (req, res) => {
    res.status(200).send(messageBuilder("Server Running normally"));
  });
  app.get("/login", (req,res)=>{
    res.status(201).send(messageBuilder("Login success"))
  });
  app.get(
    "/callback",
    PS.authenticate("discord", { failureRedirect: "/" }),
    function (req, res) {
      res.redirect("/info");
    } // auth success
  );
  app.get("/logout", (req, res) => {
    req.logout((error) => {
      console.error("Unable to logout user", error);
      res.status(500).send(messageBuilder(null, true, error));
    });
    res.redirect("/");
  });
  app.get("/info", checkAuth, async function (req, res) {
    try {
      let id = req.query.id;
      let userData = await getUserInfo(
        req.headers.authorization.replace("Bearer ", ""),
        id?.toString()
      );
      res
        .status(201)
        .send(messageBuilder(userData, false, "", "User authenticated"));
    } catch (error) {
      console.error("Error", error);
      res.status(500).send(messageBuilder(null, true, error));
    }
  });
}

async function initializeApp(app: express.Express) {
  app.use(helmet());
  app.use(cors());
  app.use(
    session({
      secret: envConfig.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(PS.initialize());
  app.use(PS.session());
  app.use(checkAuth);
}
