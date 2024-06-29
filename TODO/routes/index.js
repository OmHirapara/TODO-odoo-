import authRouter from "./authRoute.js";
import todoRouter from "./todoroutes.js";
import { checkToken } from "../middleware/token.js";
import express from "express";

const router = express.Router();

router.use("/", authRouter);
router.use("/todo", checkToken, todoRouter);

export default router;
