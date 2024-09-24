import dotenv from "dotenv";
import express from "express";
import path from "path";
import connectionDB from "./db/connectionDB.js";
import usersRouter from "./src/modules/users/users.routes.js";
import accountRouter from "./src/modules/account/account.routes.js";
import { AppError } from "./src/utils/appError.js";

dotenv.config({ path: path.resolve("config/.env") });

const app = express();
const port = process.env.PORT || 3000;

connectionDB();

app.use(express.json());

app.use("/users", usersRouter);
app.use("/account", accountRouter);

app.use("*", (req, res, next) =>
  next(new AppError(`Url ${req.originalUrl} not found`, 404))
);

app.use((err, req, res, next) =>
  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message,
  })
);

app.listen(port, () => console.log(`Example app listening on port ${port}`));
