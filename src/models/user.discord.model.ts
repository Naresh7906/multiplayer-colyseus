import mongoose, { Schema } from "mongoose";

const UserDiscordModel = new Schema({
  id: String,
  username: String,
  avatar: String,
  global_name: String,
  email: String,
});

const DiscordUser = mongoose.model("DiscordUser", UserDiscordModel);

function getUserDiscordModelFromJson(json: any) {
  let userDiscordModel = new DiscordUser();
  userDiscordModel.id = json["id"];
  userDiscordModel.username = json["username"];
  userDiscordModel.avatar = json["avatar"];
  userDiscordModel.global_name = json["global_name"];
  userDiscordModel.email = json["email"];
  return userDiscordModel;
}

export { DiscordUser, UserDiscordModel, getUserDiscordModelFromJson };