import { Length } from "class-validator";
import type { IUpdateBoard } from "./Board.types";

export class CreateBoard implements Omit<IUpdateBoard, "_id"> {
  @Length(2, 20)
  name: string;
}

export class UpdateBoard implements Omit<IUpdateBoard, "_id"> {
  @Length(2, 20)
  name: string;
}
