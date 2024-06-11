import mongoose, { Model, ObjectId, Schema } from "mongoose";
import { IProduct } from "../interfaces";
import { Category } from "./index";

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Nome é obrigatório"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: Category,
      required: [true, "Categoria é obrigatória"],
      validate: {
        validator: async function (_id: ObjectId) {
          try {
            const document = await mongoose.models.Category.findById(_id);
            return !!document;
          } catch (error) {
            console.error("Erro validando categoria:", error);
            return false;
          }
        },
        message: "Categoria inexistente",
      },
    },
  },
  {
    toJSON: {
      transform: (doc: IProduct, ret: Partial<IProduct>) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  ProductSchema,
  "products"
);
export default Product;
