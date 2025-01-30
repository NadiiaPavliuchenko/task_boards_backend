import { Length } from "class-validator";
import type { IBoard } from "./Board.types";

export class CreateBoard implements Omit<IBoard, "_id"> {
  @Length(2, 20)
  name: string;

  @Length(9, 20)
  hashedId: string;
}
