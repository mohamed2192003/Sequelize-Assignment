import { Op } from "sequelize";
import { commentModel } from "../../database/models/comment.model.js";
import { userModel } from "../../database/models/user.model.js";
import { postModel } from "../../database/models/post.model.js";
export const createBulkComments = async (comments) => {
  if (!Array.isArray(comments) || comments.length === 0) {
    throw new Error("Comments array is required");
  }
  return await commentModel.bulkCreate(comments);
};
export const updateComment = async (commentId, authorId, content) => {
  const comment = await commentModel.findByPk(commentId);
  if (!comment) {
    throw new Error("Comment not found");
  }
  if (comment.authorId !== authorId) {
    throw new Error("You are not allowed to update this comment");
  }
  comment.content = content;
  await comment.save();
  return comment;
};
export const findOrCreateComment = async (data) => {
  const { postId, authorId, content } = data;

  const [comment] = await commentModel.findOrCreate({
    where: { postId, authorId, content },
    defaults: { postId, authorId, content },
  });
  return comment;
};
export const searchComments = async (word) => {
  return await commentModel.findAndCountAll({
    where: {
      content: {
        [Op.like]: `%${word}%`,
      },
    },
  });
};
export const getNewestComments = async (postId) => {
  return await commentModel.findAll({
    where: { postId },
    order: [["createdAt", "DESC"]],
    limit: 3,
  });
};
export const getCommentDetails = async (id) => {
  return await commentModel.findByPk(id, {
    include: [
      {
        model: userModel,
        attributes: ["id", "name"],
      },
      {
        model: postModel,
        attributes: ["id", "title"],
      },
    ],
  });
};