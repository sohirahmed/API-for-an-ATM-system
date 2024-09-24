import { Router } from "express";
import * as AC from "./account.controller.js";
import * as AV from "./account.validate.js";
import auth from "../../../middleware/auth.js";
import validation from "../../../middleware/validation.js";
import { systemRoles } from "../../utils/systemRoles.js";

const router = Router();

router.post("/", auth(Object.values(systemRoles)), AC.createAccount);

router.post(
  "/deposit",
  auth(Object.values(systemRoles)),
  validation(AV.money),
  AC.deposit
);

router.post(
  "/withdraw",
  auth(Object.values(systemRoles)),
  validation(AV.money),
  AC.withdraw
);

router.get("/balance", auth(Object.values(systemRoles)), AC.getBalance);

router.get("/transaction/:id", auth(Object.values(systemRoles)), AC.getTransaction);

export default router;
