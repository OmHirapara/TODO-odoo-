import express from "express";
import controllers from "../controllers/blog.js";

const route = express.Router();

// Route to render the main page
route.get("/", controllers.home);

// Route to render the edit page
route.get("/new", controllers.edit);

// Get Edit Page By Id
route.get("/edit/:id", controllers.editById);

// Create a new post
route.post("/api/posts", controllers.newPost);

// Partially update a post
route.post("/api/posts/:id", controllers.updatePost);

// Delete a post
route.get("/api/posts/delete/:id", controllers.delPost);

// Log Out
route.get("/logout", controllers.logout);

export default route;
