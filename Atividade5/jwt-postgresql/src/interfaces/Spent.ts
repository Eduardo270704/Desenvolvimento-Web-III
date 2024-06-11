import { Document, ObjectId } from "mongoose";

export default interface ISpent extends Document {
  user: ObjectId;
  product: ObjectId;
  datetime: Date;
  value: number;
}
