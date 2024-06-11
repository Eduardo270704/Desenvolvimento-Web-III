import { Document, ObjectId } from "mongoose";

export default interface IProduct extends Document {
  name: string;
  category: ObjectId;
}
