import { userModel } from "./user.model.js";
import { postModel } from "./post.model.js";
import { commentModel } from "./comment.model.js";
userModel.hasMany(postModel, {
  foreignKey: "authorId",
  as: "posts",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
postModel.belongsTo(userModel, {
  foreignKey: "authorId",
  as: "user",
});
postModel.hasMany(commentModel, {
  foreignKey: "postId",
  as: "comments",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
commentModel.belongsTo(postModel, {
  foreignKey: "postId",
  as: "post",
});
userModel.hasMany(commentModel, {
  foreignKey: "authorId",
  as: "comments",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
commentModel.belongsTo(userModel, {
  foreignKey: "authorId",
  as: "user",
});
export { userModel, postModel, commentModel };