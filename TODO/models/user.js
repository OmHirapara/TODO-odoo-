
import sequelize from "../sequelize.js";

import { DataTypes, UUIDV4 } from "sequelize";
const user = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    timeStamp: true,
    tableName: "USER",
  }
);
user.sync({ alert: true }).then(() => {
  console.log("User Model synced");
});

export default user;

//   success: 200,
//   created: 201,
//   badRequest: 400,
//   unAuthorizedRequest: 401,
//   notFound: 404,
//   validationError: 422,
//   tooManyRequest: 429,
//   internalServerError: 500
