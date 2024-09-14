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

export async function baseRoutes(app: express.Express) {
  await initializeApp(app);
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

function getUserInfo(token: string, id: string | undefined): Promise<any> {
  return new Promise(async (resolve, reject) => {
    if (id) {
      let userData = await DiscordUser.findById(id).exec();

      if (!userData) {
        reject("User not found");
      } else resolve(userData.toJSON());
    } else {
      const axiosConfig = axios.get(endpointsConfig.DISCORD_USER_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      axiosConfig
        .then(async (response) => {
          const userData: mongoose.Document = getUserDiscordModelFromJson(
            response.data
          );
          try {
            await userData.save();
          } catch (error) {
            console.error("Unable to save user data", error);
          }
          resolve(userData.toJSON());
        })
        .catch((error) => {
          console.error("Unable to verify user with discord", error);
          reject(error);
        });
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
}
