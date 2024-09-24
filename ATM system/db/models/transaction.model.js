import { Schema, model } from "mongoose";

const transactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required:true
    },
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "account",
      required:true,
    },
    operation: {
      type: String,
      enum: ["deposit", "withdraw"],
    },
  },
  { timestamps: true, versionKey: false }
);

const transactionModel = model("transaction", transactionSchema);

export default transactionModel;
