import express from "express";
import bodyParser from "body-parser";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import sequelize from "./sequelize.js";

const app = express();

// MIDDLE_WARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
// app.use("/login",(req,res)=>{
//   res.render("login.ejs")
// })
app.use("/", router);

const host = process.env.HOST;
const port = process.env.PORT || 4000;
const server = app.listen(port);
async function testDbConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
testDbConnection();

server.on("listening", () => {
  console.info(
    `\x1b[32m • Express application started on \x1b[36mhttp://${host}:${port}\x1b[0m`
  );
});
