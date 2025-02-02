import { Types } from "mongoose";

export interface ICreateCard {
  boardId: Types.ObjectId;
  title: string;
  description?: string;
}

export interface ICard {
  title: string;
  description?: string;
}
