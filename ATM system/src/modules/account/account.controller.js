import { customAlphabet } from "nanoid";
import accountModel from "../../../db/models/account.model.js";
import transactionModel from "../../../db/models/transaction.model.js";
import { asyncHandler } from "../../utils/globalErrorHandling.js";
import { AppError } from "../../utils/appError.js";

//=====================createAccount===========================

export const createAccount = asyncHandler(async (req, res, next) => {
  const account = await accountModel.findOne({ userId: req.user._id });
  if(account){
    return next(new AppError("account already exists",))
  }
  const accountNumber = customAlphabet("0123456780" , 11)()

  await accountModel.create({
    userId: req.user._id,
    balance: 0,
    accountNumber,
  });

  res
    .status(201).json({msg:"done",accountNumber});
});

//===========================deposit====================================

export const deposit = asyncHandler(async (req, res, next) => {
  const { depositedMoney, accountNumber } = req.body;
  const account = await accountModel.findOne({
    userId: req.user._id,
    accountNumber,
  });
  if (!account)
    return next(new AppError("No account found")
    );

  account.balance += depositedMoney;
  await account.save();

  res.status(201).json({ msg:"done"});
});

//===========================withdraw====================================

export const withdraw = asyncHandler(async (req, res, next) => {
  const { withdrawMoney, accountNumber } = req.body;

  const account = await accountModel.findOne({
    userId: req.user._id,
    accountNumber,
  });

  if(!account){
    return next(new AppError("No account found"))
  }

  if (account.balance < withdrawMoney)
    return next(new AppError("no enough balance"));

  account.balance -= withdrawMoney;
  await account.save();

  res.status(201).json({msg:"done"})
});

//===========================getBalance====================================

export const getBalance = asyncHandler(async (req, res, next) => {
  const { accountNumber } = req.body;
  const account = await accountModel.findOne({
    userId: req.user._id,
    accountNumber,
  });
  if (!account)
    return next(new AppError("No account found"));

  res.status(201).json({ msg: "done", balance: account.balance });
});

//===========================getTransaction====================================

export const getTransaction = asyncHandler(async (req, res, next) => {
  const { accountNumber } = req.body;
  const account = await accountModel.findOne({
    userId: req.user._id,
    accountNumber,
  });

  if (!account)
    return next(new AppError("No account found"));

  const transaction = await transactionModel.find({
    accountId: account._id,
    userId: req.user._id,
  });

  res.status(201).json({ msg: "done", transaction });
});
