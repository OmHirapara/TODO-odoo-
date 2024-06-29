import axios from "axios";
const API_URL = "http://localhost:4000";

//render the main page
const home = async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    // console.log(response.data);
    res.render("index.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};

//render the edit page
const edit = (req, res) => {
  res.render("modify.ejs", { heading: "New Post", submit: "Create Post" });
};

// Edit Page By Id
const editById = async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    // console.log(response.data);
    res.render("modify.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
};

// Create a new post
const newPost = async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, req.body);
    // console.log(response.data);
    res.redirect("/blog");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
};

// Partially update a post
const updatePost = async (req, res) => {
  console.log("called");
  try {
    const response = await axios.patch(
      `${API_URL}/posts/${req.params.id}`,
      req.body
    );
    // console.log(response.data);
    res.redirect("/blog");
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
};

// Delete a post
const delPost = async (req, res) => {
  try {
    await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.redirect("/blog");
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
};

// log out
const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    // console.log(req.cookies.jwt);
    res.redirect("/blog");
  } catch (err) {
    console.log(err);
  }
};

const controllers = {
  home,
  edit,
  editById,
  newPost,
  updatePost,
  delPost,
  logout,
};
export default controllers;
