import { Length, IsOptional } from "class-validator";
import type { ICard } from "./Card.types";

export class CreateCard implements Omit<ICard, "_id"> {
  @Length(2, 20)
  title: string;

  @IsOptional()
  @Length(2, 200)
  description?: string;
}
