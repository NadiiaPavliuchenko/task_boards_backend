import mongoose from "mongoose";
import { Tcp } from "./Tcp";
import dotenv from "dotenv";
import { IService } from "types/services";

dotenv.config();

export class App implements IService {
  private static instance: App;

  private tcp: IService = new Tcp();

  constructor() {
    if (!App.instance) {
      App.instance = this;
    }

    return App.instance;
  }

  async init() {
    const { tcp } = this;
    console.log("App started");

    await this.connectDatabase();
    await tcp.init();

    return true;
  }

  private async connectDatabase() {
    const dbUri = process.env.DB_URI as string;

    if (!dbUri) {
      console.error("MongoDB URI is not defined in environment variables");
      process.exit(1);
    }

    try {
      await mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as any);
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    }
  }
}
