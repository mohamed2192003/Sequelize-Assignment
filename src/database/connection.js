import { Sequelize } from "sequelize";
import { databaseName, databaseUser, databasePassword } from "../../config/env.service.js";
export const sequelize = new Sequelize(databaseName, databaseUser, databasePassword, {
  host: "localhost",
  dialect: "mysql",
});
export const databaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
export const databaseSync = async () => {
  try {
    await sequelize.sync({alter: false});
    console.log("Connection has been Synced successfully.");
  } catch (error) {
    console.error("Unable to Sync to the database:", error);
  }
};