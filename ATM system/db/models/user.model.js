import { Schema, model } from "mongoose";
import { systemRoles } from "../../src/utils/systemRoles.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required:true,
      minLength:3,
      maxLength:20,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      required:true,
      minLength:6,
    },
    role: {
      type: String,
      enum: Object.values(systemRoles),
      default: "user",
    },
  },
  { timestamps: true, versionKey: false }
);

const userModel = model("user", userSchema);

export default userModel;
