import {
  JsonController,
  Get,
  Post,
  Put,
  Body,
  Param
} from "routing-controllers";
import { IBoard } from "./Board.types";
import board from "./Board.model";

@JsonController("/board")
export default class Board {
  @Get()
  async getAll(): Promise<IBoard[]> {
    return await board.find({});
  }
  @Get("/:id")
  async getOne(@Param("id") id: string): Promise<IBoard | null> {
    const res = await board.findOne({ _id: id });
    return res || null;
  }
  @Post()
  async createBoard(@Body() body: IBoard): Promise<IBoard> {
    const res = await board.create(body);
    return res;
  }
  @Put("/:id")
  async updateBoard(
    @Param("id") id: string,
    @Body() body: IBoard
  ): Promise<IBoard> {
    const res = await board.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    return res;
  }
}
