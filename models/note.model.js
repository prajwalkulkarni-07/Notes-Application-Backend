import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    content: {
      required: true,
      type: String,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const Note = mongoose.model("Note", noteSchema);
