import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "../interfaces";

const UserSchema: Schema<IUser> = new Schema(
  {
    mail: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email é obrigatório"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "E-mail inválido",
      ],
    },
    password: {
      type: String,
      select: false,
      required: [true, "Senha é obrigatória"],
      minlength: [6, "Senha deve ter no mínimo 6 caracteres"],
      maxlength: [10, "Senha deve ter no máximo 10 caracteres"],
    },
    role: {
      type: String,
      enum: ["user", "adm"],
      default: "user",
    },
  },
  {
    toJSON: {
      transform: (doc: IUser, ret: Partial<IUser>) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema, "users");
export default User;
