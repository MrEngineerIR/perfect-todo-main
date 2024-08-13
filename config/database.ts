import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const client = new MongoClient(
  process.env.MONGO_URI || "mongodb://localhost:27017/lucia"
);
let connected: boolean = false;

const connectDB = async () => {
  // mongoose.set("strictQuery", true);
  if (connected) {
    console.log("database already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    connected = true;
    console.log("databasae connected");
  } catch (error) {
    console.error(error);
  }
};
const db = client.db();
export { db };
export default connectDB;
