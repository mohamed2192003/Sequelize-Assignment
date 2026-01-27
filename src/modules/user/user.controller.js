import { Router } from "express";
import {
  createUser,
  updateUser,
  getUserByEmail,
} from "./user.service.js";
const router = Router();
router.post("/signup", async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.put("/update-user/:id", async (req, res) => {
  try {
    const result = await updateUser(req.params.id, req.body);
    res.json({ message: "User created or updated", result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/get-user-by-email", async (req, res) => {
  try {
    const { email } = req.query;
    const user = await getUserByEmail(email);
    if (!user) return res.json({ message: "User not found" });
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
export default router;