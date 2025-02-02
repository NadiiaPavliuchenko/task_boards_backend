import {
  JsonController,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param
} from "routing-controllers";
import { IBoard } from "./Board.types";
import board from "./Board.model";
import { ApiResponse } from "../../../helpers/ApiResponse";
import { ApiError } from "../../../helpers/ApiError";
import { validate } from "class-validator";
import { CreateBoard, UpdateBoard } from "./CreateBoard.dto";
import { formatDocuments } from "../../../helpers/FormatDocuments";
import { ObjectId } from "mongoose";

@JsonController("/board")
export default class Board {
  @Get()
  async getAll(): Promise<ApiResponse<IBoard[]>> {
    const res = await board.find({}).sort({ _id: -1 });
    return new ApiResponse(true, formatDocuments(res.map((doc) => doc._doc)));
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
    return new ApiResponse(true, formatDocuments(res._doc));
  }

  @Post()
  async createBoard(@Body() body: CreateBoard): Promise<ApiResponse<IBoard>> {
    const errors = await validate(body);

    if (errors.length > 0) {
      throw new ApiError(400, {
        message: "Validation failed",
        code: "BOARD_VALIDATION_ERROR",
        errors
      });
    }

    const { name } = body;
    const newBoard = {
      name,
      todo: [],
      inProgress: [],
      done: []
    };

    const res = await board.create(newBoard);
    return new ApiResponse(true, formatDocuments(res._doc));
  }

  @Patch("/:id")
  async updateBoard(
    @Param("id") id: string,
    @Body() body: UpdateBoard
  ): Promise<ApiResponse<IBoard>> {
    const errors = await validate(body);

    if (errors.length > 0) {
      throw new ApiError(400, {
        message: "Validation failed",
        code: "BOARD_VALIDATION_ERROR",
        errors
      });
    }
    const res = await board.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    return new ApiResponse(true, formatDocuments(res._doc));
  }

  @Patch("/:boardId/move-card")
  async moveCardBetweenColumns(
    @Param("boardId") boardId: string,
    @Body() body: { cardId: string; fromColumnId: string; toColumnId: string }
  ): Promise<ApiResponse<IBoard>> {
    const errors = await validate(body);

    if (errors.length > 0) {
      throw new ApiError(400, {
        message: "Validation failed",
        code: "CARD_MOVE_VALIDATION_ERROR",
        errors
      });
    }

    const { cardId, fromColumnId, toColumnId } = body;

    await board.updateOne(
      { _id: boardId, "columns._id": fromColumnId },
      { $pull: { "columns.$.cards": cardId } }
    );

    await board.updateOne(
      { _id: boardId, "columns._id": toColumnId },
      { $push: { "columns.$.cards": cardId } }
    );

    const updatedBoard = await board.findById(boardId);
    return new ApiResponse(true, formatDocuments(updatedBoard._doc));
  }

  @Patch("/:boardId/columns/:columnId")
  async updateColumnOrder(
    @Param("boardId") boardId: string,
    @Param("columnId") columnId: string,
    @Body() body: { cards: ObjectId[] }
  ): Promise<ApiResponse<IBoard>> {
    const errors = await validate(body);

    if (errors.length > 0) {
      throw new ApiError(400, {
        message: "Validation failed",
        code: "ORDER_VALIDATION_ERROR",
        errors
      });
    }
    const res = await board.findOneAndUpdate(
      { _id: boardId, "columns._id": columnId },
      { $set: { "columns.$.cards": body.cards } },
      { new: true }
    );

    return new ApiResponse(true, formatDocuments(res._doc));
  }

  @Delete("/:id")
  async deleteBoard(@Param("id") id: string): Promise<ApiResponse<IBoard>> {
    const res = await board.findOneAndDelete({ _id: id });
    if (!res) {
      throw new ApiError(404, {
        code: "BOARD_NOT_FOUND",
        message: `Board with id ${id} not found`
      });
    }
    return new ApiResponse(true, formatDocuments(res._doc));
  }
}
