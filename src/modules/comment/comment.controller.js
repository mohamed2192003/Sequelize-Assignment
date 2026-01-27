import { Router } from "express";
import { createBulkComments, updateComment, findOrCreateComment, searchComments, getNewestComments, getCommentDetails } from "./comment.service.js";
const router = Router();
router.post("/create-comment", async (req, res) => {
  try {
    const { comments } = req.body;
    const result = await createBulkComments(comments);
    res.status(201).json({ message: "Comments created", result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.patch("/update-comment/:id", async (req, res) => {
  try {
    const { authorId, content } = req.body;
    const updated = await updateComment(
      req.params.id,
      authorId,
      content
    );
    res.json({ message: "Comment updated", comment: updated });
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
});
router.post("/find-or-create-comment", async (req, res) => {
  try {
    const comment = await findOrCreateComment(req.body);
    res.json({ comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/search-comments", async (req, res) => {
  try {
    const { word } = req.query;
    const result = await searchComments(word);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/get-newest-comments/:postId", async (req, res) => {
  try {
    const comments = await getNewestComments(req.params.postId);
    res.json({ comments });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/comment-details/:id", async (req, res) => {
  try {
    const comment = await getCommentDetails(req.params.id);
    res.json({ comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
export default router;