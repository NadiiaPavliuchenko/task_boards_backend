import mongoose from "mongoose";
import { ICard } from "./Card.types";

const CardSchema = new mongoose.Schema({
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ["ToDo", "In Progress", "Done"],
    required: true
  },
  oreder: {
    type: Number,
    required: true
  }
});

const Card = mongoose.models.Card || mongoose.model<ICard>("Card", CardSchema);
export default Card;
