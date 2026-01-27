import { Router } from "express";
import { createPost, deletePost, getPostsDetails, getPostsCommentCount } from "./post.service.js";
const router = Router();
router.post("/create-post", async (req, res) => {
  try {
    const post = await createPost(req.body);
    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.delete("/delete-post/:id", async (req, res) => {
  try {
    const { authorId } = req.body;
    await deletePost(req.params.id, authorId);

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
});
router.get("/get-post-details", async (req, res) => {
  try {
    const posts = await getPostsDetails();
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/get-post-comment-count", async (req, res) => {
  try {
    const posts = await getPostsCommentCount();
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;