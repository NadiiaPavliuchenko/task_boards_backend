import { Document, Types } from "mongoose";

export interface ICard extends Document {
  boardId: Types.ObjectId;
  title: string;
  description?: string;
  status: "ToDo" | "In Progress" | "Done";
  order: number;
}
