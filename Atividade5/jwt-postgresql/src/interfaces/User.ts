import { Document } from "mongoose";

export default interface IUser extends Document {
  mail: string;
  password: string;
  role: "user" | "adm";
}
