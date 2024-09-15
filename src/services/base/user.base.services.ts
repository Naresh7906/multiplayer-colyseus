import axios from "axios";
import {
  DiscordUser,
  getUserDiscordModelFromJson,
} from "../../models/user.discord.model";
import { endpointsConfig } from "../../config/endpoints.config";
import mongoose from "mongoose";

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

function getUserInfoFromDB(id: string | undefined): Promise<any> {
  return new Promise(async (resolve, reject) => {
    if (id) {
      let userData = await DiscordUser.findById(id).exec();

      if (!userData) {
        reject("User not found");
      } else resolve(userData.toJSON());
    }
  });
}

export { getUserInfo, getUserInfoFromDB };
