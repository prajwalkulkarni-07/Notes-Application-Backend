import { Note } from "../models/note.model.js";

export const addNote = async (req, res) => {
  const { title, content, color } = req.body;

  try {
    if (!title || !content) {
      throw new Error("Both note title and content are required");
    }

    const note = new Note({
      title,
      content,
      color,
    });

    await note.save();

    res
      .status(200)
      .json({ success: true, message: "Note added successfully", note });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res
      .status(200)
      .json({ success: true, message: "All notes fetched", notes });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching notes",
      message: error.message,
    });
  }
};

export const editNote = async (req, res) => {
  const id = req.params.id;
  const { title, content, color } = req.body;
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content, color },
      { new: true } // returns the updated document
    );
    res.status(200).json({
      success: true,
      message: "Note edited successfully",
      updatedNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error editing note",
      message: error.message,
    });
  }
};

export const deleteNote = async (req, res) => {
  const id = req.params.id;
  try {
    const note = await Note.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Note deleted successfully", note });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting note",
      message: error.message,
    });
  }
};

export const pinNote = async (req, res) => {
  const id = req.params.id;

  try {
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    // Toggle pinned state
    note.pinned = !note.pinned;
    const updatedNote = await note.save();

    res.status(200).json({
      success: true,
      message: `Note ${note.pinned ? "pinned" : "unpinned"} successfully`,
      updatedNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error toggling pinned state",
      error: error.message,
    });
  }
};
