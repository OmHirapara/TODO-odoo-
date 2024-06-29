
import sequelize from "../sequelize.js";

import { DataTypes, UUIDV4 } from "sequelize";
const todo = sequelize.define(
    "todo",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timeStamp: true,
      tableName: "TODO",
    }
  );
  todo.sync({ alert: true }).then(() => {
    console.log("User Model synced");
  });
  
  export default todo;