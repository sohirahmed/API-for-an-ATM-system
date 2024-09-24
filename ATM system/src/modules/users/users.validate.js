import Joi from "joi";

export const signUp = {
  body: Joi.object({
    name: Joi.string().min(3).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(15).required(),
  }),
};

export const signIn = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(15).required(),
  }).required(),
};
