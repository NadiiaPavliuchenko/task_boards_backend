import mongoose from "mongoose";
import { IBoard } from "./Board.types";

const BoardSchema = new mongoose.Schema<IBoard>(
  {
    name: {
      type: String,
      required: true
    },
    hashedId: {
      type: String,
      unique: true,
      required: true
    }
  },
  { versionKey: false }
);

const Board =
  mongoose.models.Board || mongoose.model<IBoard>("Board", BoardSchema);
export default Board;
