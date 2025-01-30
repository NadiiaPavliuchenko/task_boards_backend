import { Document } from "mongoose";

export interface IBoard extends Document {
  name: string;
  hashedId: string;
}
