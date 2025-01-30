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
import { ApiResponse } from "../../../helpers/ApiResponse";
import { ApiError } from "../../../helpers/ApiError";

@JsonController("/board")
export default class Board {
  @Get()
  async getAll(): Promise<ApiResponse<IBoard[]>> {
    const res = await board.find({});
    return new ApiResponse(true, res);
  }

  @Get("/:id")
  async getOne(@Param("id") id: string): Promise<ApiResponse<IBoard | object>> {
    const res = await board.findOne({ _id: id });
    if (!res) {
      throw new ApiError(404, {
        code: "BOARD NOT FOUND",
        message: `Board with id ${id} not found`
      });
    }
    return new ApiResponse(true, res);
  }

  @Post()
  async createBoard(@Body() body: IBoard): Promise<ApiResponse<IBoard>> {
    const res = await board.create(body);
    return new ApiResponse(true, res);
  }

  @Put("/:id")
  async updateBoard(
    @Param("id") id: string,
    @Body() body: IBoard
  ): Promise<ApiResponse<IBoard>> {
    const res = await board.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    if (!res) {
      throw new ApiError(404, {
        code: "BOARD NOT FOUND",
        message: `Board with id ${id} not found`
      });
    }
    return res;
  }
}
