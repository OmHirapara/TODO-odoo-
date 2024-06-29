import express from "express";
import controller from "../controllers/user.js";

const router = express.Router();

router.get("/", controller.login);

router.get("/register", controller.register);

router.post("/register", controller.signup);

router.post("/login", controller.signin);

export default router;
