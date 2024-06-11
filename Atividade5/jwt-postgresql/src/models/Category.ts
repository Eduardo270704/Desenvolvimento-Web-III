import mongoose, { Model, Schema } from "mongoose";
import { ICategory } from "../interfaces";

const CategorySchema: Schema<ICategory> = new Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "O nome é obrigatório"],
    },
  },
  {
    toJSON: {
      transform: (doc: ICategory, ret: Partial<ICategory>) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Category: Model<ICategory> = mongoose.model<ICategory>(
  "Category",
  CategorySchema,
  "categories"
);
export default Category;
