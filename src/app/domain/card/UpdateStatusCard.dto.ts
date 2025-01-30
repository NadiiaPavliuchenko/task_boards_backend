import { IsIn } from "class-validator";
import type { IUpdateCardStatus } from "./Card.types";

export class UpdateStatusCard implements Omit<IUpdateCardStatus, "_id"> {
  @IsIn(["ToDo", "In Progress", "Done"])
  status: "ToDo" | "In Progress" | "Done";
}
