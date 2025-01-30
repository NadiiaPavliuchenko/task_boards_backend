import { Types } from "mongoose";

export interface ICard {
  boardId: Types.ObjectId;
  title: string;
  description?: string;
  status: "ToDo" | "In Progress" | "Done";
  order: number;
}

type CardStatus = "ToDo" | "In Progress" | "Done";
export interface IUpdateCardStatus {
  status: CardStatus;
}
