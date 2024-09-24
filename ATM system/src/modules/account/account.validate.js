import Joi from "joi";

export const money = {
  body: Joi.object({
    depositedMoney: Joi.number().integer().positive().min(50),
    withdrawMoney:Joi.number().integer().positive().min(50),
    accountNumber: Joi.string().min(11).max(11)
  }).presence("required"),
};
