import axios from "axios";
import { DiscordUser, getUserDiscordModelFromJson } from "../models/user.discord.model";
import { endpointsConfig } from "../config/endpoints.config";
import mongoose from "mongoose";

const messageBuilder = (
  response: object | string | null = null,
  error: boolean = false,
  errorMessage: string | any = "",
  successMessage: string = ""
) => {
  return {
    data: response,
    error: error,
    errorMessage: errorMessage,
    successMessage: successMessage,
  };
};


export {messageBuilder};
