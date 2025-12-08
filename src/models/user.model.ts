import { Schema, model, Document } from "mongoose";
import { userTypes } from "../constants/userTypes.js";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}


const userSchema = new Schema<IUser>(
  {
  name : { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6, select: false },
  role: { type: String, default: "student", enum: userTypes },
  },
  { timestamps: true}
)

userSchema.pre("save", function (this: IUser, next) {
  if (this.isModified("email") && this.email) {
    this.email = this.email.toLowerCase();
  }
  next();
});


const User = model<IUser>("User", userSchema);



export default User;