import { sequelize } from "../connection.js";
import { DataTypes, Model } from "sequelize";
class commentModel extends Model {}
commentModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "posts",
        key: "id",
      },
    },
    authorId: {
      type: DataTypes.INTEGER,   
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "comment",
    timestamps: true,
  }
);
export { commentModel };