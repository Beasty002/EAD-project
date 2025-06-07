import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";
import express from "express";
const router = express.Router();

router.get("/getAll", getNotes);
router.post("/add", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
