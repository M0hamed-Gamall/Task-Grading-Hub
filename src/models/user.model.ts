import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  roles: string;
  createdAt: Date;
  updatedAt: Date;
}


const userSchema = new Schema<IUser>(
  {
  name : { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: String, default: "student" },
  },
  { timestamps: true}
)

export const User = model<IUser>("User", userSchema);