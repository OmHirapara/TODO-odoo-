import path from "path";
import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config({
  override: true,
  path:"./config/development.env",
});

const sequelize = new Sequelize(
  process.env.CONNECTION_STRING,
  {
    dialect: "postgres",
    logging: false,
  }
);

export default sequelize;
