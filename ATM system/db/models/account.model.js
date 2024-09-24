import { Schema, model } from "mongoose";

const accountSchema = new Schema(
  {
    balance: {
      type: Number,
      required:true,
    },
    accountNumber: {
      type: String,
      required: true,
      minLength: 11,
      maxLength: 11,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const accountModel = model("account", accountSchema);

export default accountModel;
