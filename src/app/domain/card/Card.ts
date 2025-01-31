import {
  JsonController,
  Get,
  Post,
  Put,
  Patch,
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
import { UpdateStatusCard } from "./UpdateStatusCard.dto";
import { formatDocuments } from "../../../helpers/FormatDocuments";

@JsonController("/card")
export default class Card {
  @Get("/:boardId")
  async getCards(
    @Param("boardId") boardId: string
  ): Promise<ApiResponse<ICard | object>> {
    const res = await card.find({ boardId });
    if (!res) {
      throw new ApiError(404, {
        code: "CARDS_NOT_FOUND",
        message: `Cards with board id ${boardId} not found`
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
    const res = await card.create(body);
    return new ApiResponse(true, formatDocuments(res._doc));
  }

  @Put("/:id")
  async updateCard(
    @Param("id") id: string,
    @Body() body: CreateCard
  ): Promise<ApiResponse<ICard>> {
    const errors = await validate(body);

    if (errors.length > 0) {
      throw new ApiError(400, {
        message: "Validation failed",
        code: "CARD_VALIDATION_ERROR",
        errors
      });
    }
    const res = await card.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    return new ApiResponse(true, formatDocuments(res._doc));
  }

  @Patch("/:id")
  async updateCardStatus(
    @Param("id") id: string,
    @Body() body: UpdateStatusCard
  ): Promise<ApiResponse<ICard>> {
    const errors = await validate(body);

    if (errors.length > 0) {
      throw new ApiError(400, {
        message: "Validation failed",
        code: "CARD_VALIDATION_ERROR",
        errors
      });
    }
    const res = await card.findOneAndUpdate({ _id: id }, body);
    return new ApiResponse(true, formatDocuments(res._doc));
  }

  @Delete("/:id")
  async deleteBoard(@Param("id") id: string): Promise<ApiResponse<ICard>> {
    const res = await card.findOneAndDelete({ _id: id });
    if (!res) {
      throw new ApiError(404, {
        code: "CARD_NOT_FOUND",
        message: `Card with id ${id} not found`
      });
    }
    return new ApiResponse(true, formatDocuments(res._doc));
  }
}
