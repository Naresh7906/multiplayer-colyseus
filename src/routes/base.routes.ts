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

let mongooseInstance : Mongoose | null = null;

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
  app.get("/login", PS.authenticate("discord"));
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
      let userData = await getUserInfo(
        req.headers.authorization.replace("Bearer ", "")
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

function getUserInfo(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const axiosConfig = axios.get(endpointsConfig.DISCORD_USER_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    axiosConfig
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Unable to verify user with discord", error);
        reject(error);
      });
  });
}

async function initializeApp(app: express.Express) {  
  mongooseInstance = await mongoose.connect(envConfig.DATABASE_CONNECTION_STRING);
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
}
