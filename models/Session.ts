import { models, model, Schema } from "mongoose";

const SessionSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    _id: true,
  }
);

const Session = models.Session || model("Session", SessionSchema);
export default Session;
