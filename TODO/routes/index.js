import authRouter from "./authRoute.js";
import blogRouter from "./blogroutes.js";
import { checkTokenHome, checkToken } from "../middleware/token.js";
import express from "express";

const router = express.Router();

router.use("/auth", checkTokenHome, authRouter);
router.use("/blog", checkToken, blogRouter);

export default router;
