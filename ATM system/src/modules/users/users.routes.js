import { Router } from "express";
import * as UC from "./users.controller.js";
import * as UV from "./users.validate.js";
import validation from "../../../middleware/validation.js";

const router = Router();

router.post("/register", validation(UV.signUp), UC.register);

router.post("/login", validation(UV.signIn), UC.login);

export default router;
