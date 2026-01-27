import { sequelize } from "../connection.js";
import { DataTypes } from "sequelize";

export const userModel = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // ✔️ built-in (مطلوب)
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkPasswordLength(value) {
          if (value.length <= 6) {
            throw new Error("Password must be more than 6 characters");
          }
        },
      },
    },

    role: {
      type: DataTypes.ENUM("user", "admin"), // ✔️ ENUM
      defaultValue: "user",
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate(user) {
        if (user.name.trim().length <= 2) {
          throw new Error("Name must be more than 2 characters");
        }
        user.name = user.name.trim();
      },
    },
  }
);