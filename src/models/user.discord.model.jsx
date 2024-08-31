import { Schema } from "mongoose";

export const UserDiscordModel = new Schema({
  id: String,
  username: String,
  avatar: String,
  global_name: String,
  email: String,
});
