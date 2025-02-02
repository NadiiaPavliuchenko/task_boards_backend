import { Length, IsOptional, IsMongoId } from "class-validator";
import type { ICreateCard } from "./Card.types";
import { Types } from "mongoose";

export class CreateCard implements Omit<ICreateCard, "_id"> {
  @IsMongoId()
  boardId: Types.ObjectId;

  @Length(2, 20)
  title: string;

  @IsOptional()
  @Length(2, 200)
  description?: string;
}
