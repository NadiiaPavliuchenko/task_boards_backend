import mongoose from "mongoose";

export interface IBoard {
  name: string;
  todo: mongoose.Types.ObjectId[];
  inProgress: mongoose.Types.ObjectId[];
  done: mongoose.Types.ObjectId[];
}

export interface IUpdateBoard {
  name: string;
}
