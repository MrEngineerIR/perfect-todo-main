import { ServerApiVersion } from "mongodb";
import mongoose from "mongoose";

let connected: boolean = false;

const connectDB = async () => {
  // mongoose.set("strictQuery", true);
  if (connected) {
    // console.log("database already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    connected = true;
    // console.log("databasae connected");
  } catch (error) {
    throw new Error("failed to connect to database");
  }
};

export default connectDB;
