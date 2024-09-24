import userModel from "../../../db/models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { asyncHandler } from "../../utils/globalErrorHandling.js";
import { AppError } from "../../utils/appError.js";

//============================register=====================================

export const register = asyncHandler(async (req, res, next) => {
  const {name, email, password } = req.body;

  const user = await userModel.findOne({ email: email.toLowerCase() });
  if(user){
    next(new AppError("email already exists"))
  }
  const hashed = bcrypt.hashSync(password, parseInt(process.env.saltRounds));

  const newUser = await userModel.create({name ,email:email ,password: hashed });

  if(!newUser){
    next(new AppError("user not created"))
  }

  res.status(201).json({msg:"done", data: newUser,});
});

//===================login================================================

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email: email.toLowerCase() });

  if (!user || !bcrypt.compareSync(password, user.password))
    return next(new AppError("inValid email or inValid password", 401));

  const token = jwt.sign(
    { id: user._id, email: email.toLowerCase() },
    process.env.signatureKey
  );
  res.status(201).json({msg:"done", token});
});
