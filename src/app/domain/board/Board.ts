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
import { validate } from "class-validator";
import { CreateBoard } from "./CreateBoard.dto";

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
        code: "BOARD_NOT_FOUND",
        message: `Board with id ${id} not found`
      });
    }
    return new ApiResponse(true, res);
  }

  @Post()
  async createBoard(@Body() body: CreateBoard): Promise<ApiResponse<IBoard>> {
    const errors = await validate(body);

    if (errors.length > 0) {
      throw new ApiError(400, {
        message: "Validation failed",
        code: "Board_VALIDATION_ERROR",
        errors
      });
    }

    const res = await board.create(body);
    return new ApiResponse(true, res);
  }

  @Put("/:id")
  async updateBoard(
    @Param("id") id: string,
    @Body() body: CreateBoard
  ): Promise<ApiResponse<IBoard>> {
    const errors = await validate(body);

    if (errors.length > 0) {
      throw new ApiError(400, {
        message: "Validation failed",
        code: "Board_VALIDATION_ERROR",
        errors
      });
    }
    const res = await board.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    return new ApiResponse(true, res);
  }
}
