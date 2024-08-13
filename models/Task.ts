import { model, models, Schema } from "mongoose";

const TaskSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, _id: true }
);

const Task = models.Task || model("Task", TaskSchema);
export default Task;
