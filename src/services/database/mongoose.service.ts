import mongoose from "mongoose";
import { envConfig } from "../../config/env.config";

class MongooseService {
  private count = 0;
  private readonly MONGO_CONNECTION_STRING: string =
    envConfig.DATABASE_CONNECTION_STRING;

  constructor() {
    this.connectWithRetry();
  }

  getMongoose() {
    return mongoose;
  }

  private connectWithRetry = () => {
    mongoose
      .connect(this.MONGO_CONNECTION_STRING)
      .then(() => {
        console.log("MongoDB is connected");
      })
      .catch((err) => {
        console.error(
          "MongoDB connection unsuccessful, retry after 5 seconds. ",
          ++this.count
        );
        setTimeout(this.connectWithRetry, 5000);
      });
  };
}

const mongooseService = new MongooseService();

export { mongooseService };