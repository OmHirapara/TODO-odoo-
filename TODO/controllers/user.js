// import sequelize from "../sequelize.js";
import User from "../models/user.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Get All Users
const saltRounds = 10;

const createToken = (id) => {
  return jwt.sign({ id }, "TOP SECRETS", {
    expiresIn: "1h",
  });
};



const login = (req, res) => {
  res.render("login.ejs");
};

const secrets = (req, res) => {
  res.render("secrets.ejs");
};

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if username (email) and password are provided
    if (username && password) {
      // Check if user already exists in the database
      const existingUser = await User.findOne({ where: { email: username } });
      if (existingUser) {
        res.send("User already exists. Try logging in.");
      } else {
        // Hash the password using bcrypt
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          if (err) {
            console.error("Error hashing password:", err);
            res.status(500).send("Internal server error");
          } else {
            // Create a new user record in the database
            const newUser = await User.create({
              email: username,
              password: hash,
            });

            if (newUser) {
              res.redirect("/auth"); // Redirect to login page after successful signup
            } else {
              res.send("Something went wrong");
            }
          }
        });
      }
    } else {
      res.send("Please enter email and password");
    }
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).send("Internal server error");
  }
};
const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username (email) and password are provided
    if (username && password) {
      // Find user in the database by email
      const user = await User.findOne({ where: { email: username } });

      if (user) {
        // Compare hashed password with provided password
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            res.status(500).send("Internal server error");
          } else {
            if (result) {
              // Passwords match, create JWT token
              const token = createToken(user.id);
              res.cookie("jwt", token, { httpOnly: true });
              // res.redirect("/todo");
              res.redirect("/todo") // Redirect to blog page after successful login
            } else {
              res.send("Incorrect Password");
            }
          }
        });
      } else {
        res.send("User Not Found");
      }
    } else {
      res.send("Please Enter Email And Password.");
    }
  } catch (error) {
    console.error("Error in signin:", error);
    res.status(500).send("Internal server error");
  }
};
const controllers = {
  login,
  signup,
  signin,
};

export default controllers;
