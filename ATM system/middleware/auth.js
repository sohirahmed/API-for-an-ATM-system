import jwt from "jsonwebtoken";
import userModel from "../db/models/user.model.js";
import { asyncHandler } from "../src/utils/globalErrorHandling.js";
import { AppError } from "../src/utils/appError.js";

const auth = (roles = []) => {
  return asyncHandler(async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
      return res.status(400).json({ msg: "token not exist" });
    }
    if (!token.startsWith(process.env.bearerKey))
      return next(new AppError("invalid bearer key", 401));

    const newToken = token.split(process.env.bearerKey)[1];

    if (!newToken) return next(new AppError("Token is not valid", 401));

    const decoded = jwt.verify(newToken, process.env.signatureKey);
    if (!decoded?.id) return next(new AppError("invalid token payload", 401));

    const user = await userModel.findById(decoded.id);

    if (!user) return next(new AppError("user not found", 404));

    if (!roles.includes(user.role))
      return next(new AppError("you are not authorized to access this route", 403));

    req.user = user;
    next();
  });
};

export default auth;
