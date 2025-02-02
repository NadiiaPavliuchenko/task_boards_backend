import mongoose from "mongoose";
import { IBoard } from "./Board.types";

const BoardSchema = new mongoose.Schema<IBoard>(
  {
    name: {
      type: String,
      required: true
    },
    todo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
        required: true
      }
    ],
    inProgress: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
        required: true
      }
    ],
    done: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
        required: true
      }
    ]
  },
  { versionKey: false }
);

const Board =
  mongoose.models.Board || mongoose.model<IBoard>("Board", BoardSchema);
export default Board;
