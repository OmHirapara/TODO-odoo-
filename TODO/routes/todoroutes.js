import express from "express";
import controllers from "../controllers/todo.js";

const route = express.Router();

// Route to render the main page
route.get("/",controllers.checkAll)
route.post("/add",controllers.insertItem)
route.post("/edit",controllers.updateItem)
route.post("/delete",controllers.deleteItem)

export default route;
