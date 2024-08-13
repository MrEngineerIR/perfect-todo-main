import { model, models, Schema } from "mongoose";

const BoardSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, _id: true }
);

const Board = models.Board || model("Board", BoardSchema);
export default Board;
