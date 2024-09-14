import passport from "passport";
import { Strategy } from "passport-discord";
import * as oauth2 from "passport-oauth2";
import { envConfig } from "../../config/env.config";
import { NextFunction, Request, Response } from "express";
import { messageBuilder } from "../../utilities/base.utilities";
import axios from "axios";
import { endpointsConfig } from "../../config/endpoints.config";
const scopes = ["identify", "email", "guilds", "guilds.join"];
const prompt = "consent";
const ENDPOINT = endpointsConfig.DISCORD_TOKEN_VERIFICATION_ENDPOINT;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new Strategy(
    {
      clientID: envConfig.CLIENT_ID,
      clientSecret: envConfig.CLIENT_SECRET,
      callbackURL: envConfig.CALLBACK_URL,
      scope: scopes,
    },
    verify
  )
);

function verify(
  accessToken: string,
  refreshToken: string,
  profile: Strategy.Profile,
  done: oauth2.VerifyCallback
) {
  process.nextTick(function () {
    return done(null, profile);
  });
}

async function checkAuth(req: Request, res: Response, next: NextFunction) {
  if (!envConfig.ENABLE_AUTH) next();
  else if (req.headers.authorization) {
    try {
      let data = await verifyWithDiscord(
        req.headers.authorization.replace("Bearer ", "")
      );
      next();
    } catch (error) {
      res
        .status(401)
        .send(messageBuilder(null, true, "User not authenticated"));
      return;
    }
  } else
    res.status(401).send(messageBuilder(null, true, "User not authenticated"));
  return;
}

function verifyWithDiscord(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const axiosConfig = axios.get(ENDPOINT, {
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

export { passport as PS, scopes, checkAuth };
