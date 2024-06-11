import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import { ISpent } from "../interfaces";
import { User, Product } from "./index";

const SpentSchema: Schema<ISpent> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Usuário é obrigatório"],
      validate: {
        validator: async function (_id: ObjectId) {
          try {
            const document = await mongoose.models.User.findById(_id);
            return !!document;
          } catch (error) {
            console.error("Error validating user:", error);
            return false;
          }
        },
        message: "Usuário inexistente",
      },
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Produto é obrigatório"],
      validate: {
        validator: async function (_id: ObjectId) {
          try {
            const document = await mongoose.models.Product.findById(_id);
            return !!document;
          } catch (error) {
            console.error("Error validating product:", error);
            return false;
          }
        },
        message: "Produto inexistente",
      },
    },
    datetime: {
      type: Date,
      default: Date.now,
    },
    value: {
      type: Number,
      required: [true, "Valor é obrigatório"],
      min: [0, "Valor deve ser maior ou igual a 0"],
    },
  },
  {
    toJSON: {
      transform: (doc: ISpent, ret: Partial<ISpent>) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Spent: Model<ISpent> = mongoose.model<ISpent>(
  "Spent",
  SpentSchema,
  "spents"
);
export default Spent;
