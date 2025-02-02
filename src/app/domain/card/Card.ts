import {
  JsonController,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete
} from "routing-controllers";
import { ICard } from "./Card.types";
import card from "./Card.model";
import { ApiResponse } from "../../../helpers/ApiResponse";
import { ApiError } from "../../../helpers/ApiError";
import { CreateCard } from "./CreateCard.dto";
import { validate } from "class-validator";
import { formatDocuments } from "../../../helpers/FormatDocuments";
import board from "../board/Board.model";

@JsonController("/card")
export default class Card {
  @Get("/:id")
  async getCards(
    @Param("id") id: string
  ): Promise<ApiResponse<ICard | object>> {
    const res = await card.find({ _id: id });
    if (!res) {
      throw new ApiError(404, {
        code: "CARDS_NOT_FOUND",
        message: `Cards with board id ${id} not found`
      });
    }

    const formatted = formatDocuments(res.map((doc) => doc._doc));
    return new ApiResponse(
      true,
      formatted.length === 1 ? formatted[0] : formatted
    );
  }

  @Post()
  async createCard(@Body() body: CreateCard): Promise<ApiResponse<ICard>> {
    const errors = await validate(body);

    if (errors.length > 0) {
      throw new ApiError(400, {
        message: "Validation failed",
        code: "CARD_VALIDATION_ERROR",
        errors
      });
    }
    const { boardId, title, description } = body;
    const res = await card.create({ title, description });
    await board.findOneAndUpdate(
      { _id: boardId },
      {
        $push: {
          todo: res._doc._id
        }
      },
      {
        new: true
      }
    );
    return new ApiResponse(true, formatDocuments(res._doc));
  }

  @Put("/:id")
  async updateCard(
    @Param("id") id: string,
    @Body() body: CreateCard
  ): Promise<ApiResponse<ICard>> {
    const { title, description } = body;

    const data = {
      title,
      description
    };

    const errors = await validate(data);

    if (errors.length > 0) {
      throw new ApiError(400, {
        message: "Validation failed",
        code: "CARD_VALIDATION_ERROR",
        errors
      });
    }
    const res = await card.findOneAndUpdate(
      { _id: id },
      { $set: data },
      { new: true }
    );
    return new ApiResponse(true, formatDocuments(res._doc));
  }

  @Delete("/:id/board/:boardId")
  async deleteBoard(
    @Param("boardId") boardId: string,
    @Param("id") id: string
  ): Promise<ApiResponse<ICard>> {
    const res = await card.findOneAndDelete({ _id: id });

    if (!res) {
      throw new ApiError(404, {
        code: "CARD_NOT_FOUND",
        message: `Card with id ${id} not found`
      });
    }

    await board.findOneAndUpdate(
      { _id: boardId },
      {
        $pull: {
          todo: res._doc._id,
          inProgress: res._doc._id,
          done: res._doc._id
        }
      },
      {
        new: true
      }
    );
    return new ApiResponse(true, formatDocuments(res._doc));
  }
}
