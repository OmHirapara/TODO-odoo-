import express from "express";
import controller from "../controllers/user.js";

const router = express.Router();

router.get("/auth", controller.login);

router.post("/signup", controller.signup);

router.post("/signin", controller.signin);

export default router;
