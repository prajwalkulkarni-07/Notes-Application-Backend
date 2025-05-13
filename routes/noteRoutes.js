import express from "express";
import {getAllNotes, addNote, deleteNote, editNote, pinNote} from "../controllers/noteController.js";

const router = express.Router();

router.get("/", getAllNotes);

router.post("/addNote", addNote);

router.delete("/deleteNote/:id", deleteNote);

router.post("/editNote/:id", editNote);

router.post("/pinNote/:id", pinNote);

export default router;