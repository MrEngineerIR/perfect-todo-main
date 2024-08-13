import { model, models, Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    label: {
      type: String,
      required: true,
    },
    BoardId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, _id: true }
);

const Category = models.Category || model("Category", CategorySchema);
export default Category;
