// import sequelize from "../sequelize.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Get All Users
const saltRounds = 10;

const createToken = (id) => {
  return jwt.sign({ id }, "TOP SECRETS", {
    expiresIn: "1h",
  });
};

async function checkUsers() {
  const result = await db.query("SELECT * FROM users");
  return result.rows;
}

const home = (req, res) => {
  res.render("home.ejs");
};

const login = (req, res) => {
  res.render("login.ejs",{
    auth:false
  });
};

const register = (req, res) => {
  res.render("register.ejs");
};

const secrets = (req, res) => {
  res.render("secrets.ejs");
};

const signup = async (req, res) => {
  try {
    const users = await checkUsers();
    // console.log(users);
    const { username, password } = req.body;
    if ((username, password)) {
      (await users.find((user) => user.email == username))
        ? res.send("User Already Exist.Try logging in.")
        : //hashing the password and saving it in the database
          bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
              console.error("Error hashing password:", err);
            } else {
              // console.log("Hashed Password:", hash);
              const newUser = await db.query(
                "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
                [username, hash]
              );
              if (newUser) {
                res.redirect("/auth/login");
              } else {
                res.send("Something went wrong");
              }
            }
          });
    } else {
      res.send("Please Enter Email And Password");
    }
  } catch (error) {
    console.log(error);
  }
};
const signin = async (req, res) => {
  try {
    const users = await checkUsers();
    const { username, password } = req.body;
    if ((username, password)) {
      const result = await users.find((user) => user.email == username);
      if (result) {
        //verifying the password
        // console.log(typeof password, typeof result.password);
        bcrypt.compare(password, result.password, (err, results) => {
          if (err) {
            console.error("Error comparing passwords:", err);
          } else {
            if (results) {
              // console.log(result.id);
              const token = createToken(result.id);
              res.cookie("jwt", token, { httpOnly: true });
              res.redirect("/blog");
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
    console.log(error);
  }
};
const controllers = {
  home,
  register,
  secrets,
  login,
  signup,
  signin,
};

export default controllers;
