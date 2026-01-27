import { sequelize } from "../../database/connection.js";
import { postModel } from "../../database/models/post.model.js";
import { userModel } from "../../database/models/user.model.js";
import { commentModel } from "../../database/models/comment.model.js";
export const createPost = async (data) => {
  const { title, content, authorId } = data;
  if (!title || !content || !authorId) {
    throw new Error("title, content and authorId are required");
  }
  const post = postModel.build({ title, content, authorId });
  await post.save();
  return post;
};
export const deletePost = async (postId, authorId) => {
  const post = await postModel.findByPk(postId);
  if (!post) {
    throw new Error("Post not found");
  }
  if (post.authorId !== authorId) {
    throw new Error("You are not allowed to delete this post");
  }
  await post.destroy();
  return true;
};
export const getPostsDetails = async () => {
  return await postModel.findAll({
    attributes: ["id", "title"],
    include: [
      {
        model: userModel,
        attributes: ["id", "name"],
      },
      {
        model: commentModel,
        attributes: ["id", "content"],
      },
    ],
  });
};
export const getPostsCommentCount = async () => {
  return await postModel.findAll({
    attributes: [
      "id",
      "title",
      [
        sequelize.fn("COUNT", sequelize.col("comments.id")),
        "commentCount",
      ],
    ],
    include: [
      {
        model: commentModel,
        attributes: [],
      },
    ],
    group: ["post.id"],
  });
};