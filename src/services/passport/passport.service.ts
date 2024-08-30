import passport from "passport";
import { Strategy } from "passport-discord";
import * as oauth2 from "passport-oauth2";
import { envConfig } from "../../config/env.config";
import { NextFunction, Request, Response } from "express";
import { messageBuilder } from "../../utilities/base.utilities";
const scopes = ["identify", "email", "guilds", "guilds.join"];
const prompt = "consent";

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

function checkAuth(req : Request | any, res : Response, next : NextFunction) {
  if (req.isAuthenticated()) return next();
  res.status(500).send(messageBuilder(null, true, "User not authenticated"));
}

export {passport as PS, scopes, checkAuth};
