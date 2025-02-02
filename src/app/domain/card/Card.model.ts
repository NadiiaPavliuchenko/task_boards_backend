import mongoose from "mongoose";
import { ICard } from "./Card.types";

const CardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: String
  },
  { versionKey: false }
);

const Card = mongoose.models.Card || mongoose.model<ICard>("Card", CardSchema);
export default Card;
