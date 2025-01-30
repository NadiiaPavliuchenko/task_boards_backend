import {
  JsonController,
  Get,
  Post,
  Put,
  Patch,
  Body,
  Param
} from "routing-controllers";
import { ICard, IUpdateCardStatus } from "./Card.types";
import card from "./Card.model";
import { ApiResponse } from "../../../helpers/ApiResponse";
import { ApiError } from "../../../helpers/ApiError";

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
        message: `Cards with dord id ${boardId} not found`
      });
    }
    return new ApiResponse(true, res);
  }

  @Post()
  async createCard(@Body() body: ICard): Promise<ApiResponse<ICard>> {
    const res = await card.create(body);
    return new ApiResponse(true, res);
  }
  @Put("/:id")
  async updateCard(
    @Param("id") id: string,
    @Body() body: ICard
  ): Promise<ApiResponse<ICard>> {
    const res = await card.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    if (!res) {
      throw new ApiError(404, {
        code: "Card NOT FOUND",
        message: `Card with id ${id} not found`
      });
    }
    return new ApiResponse(true, res);
  }

  @Patch("/:id")
  async updateCardStatus(
    @Param("id") id: string,
    @Body() body: IUpdateCardStatus
  ): Promise<ApiResponse<ICard>> {
    const res = await card.findOneAndUpdate({ _id: id }, body);
    if (!res) {
      throw new ApiError(404, {
        code: "Card NOT FOUND",
        message: `Card with id ${id} not found`
      });
    }
    return new ApiResponse(true, res);
  }
}
