import { Length, IsInt, IsMongoId, IsIn, IsOptional } from "class-validator";
import type { ICard } from "./Card.types";
import { Types } from "mongoose";

export class CreateCard implements Omit<ICard, "_id"> {
  @IsMongoId()
  boardId: Types.ObjectId;

  @Length(2, 20)
  title: string;

  @IsOptional()
  @Length(2, 200)
  description?: string;

  @IsIn(["ToDo", "In Progress", "Done"])
  status: "ToDo" | "In Progress" | "Done";

  @IsInt()
  order: number;
}
