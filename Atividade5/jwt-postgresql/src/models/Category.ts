import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
  },
});

const Category = mongoose.model("Category", CategorySchema, "categories");

export default Category;
