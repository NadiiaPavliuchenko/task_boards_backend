"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const Card_model_1 = __importDefault(require("./Card.model"));
const ApiResponse_1 = require("../../../helpers/ApiResponse");
const ApiError_1 = require("../../../helpers/ApiError");
const CreateCard_dto_1 = require("./CreateCard.dto");
const class_validator_1 = require("class-validator");
const FormatDocuments_1 = require("../../../helpers/FormatDocuments");
const Board_model_1 = __importDefault(require("../board/Board.model"));
let Card = class Card {
    async getCards(id) {
        const res = await Card_model_1.default.find({ _id: id });
        if (!res) {
            throw new ApiError_1.ApiError(404, {
                code: "CARDS_NOT_FOUND",
                message: `Cards with ids ${id} not found`
            });
        }
        const formatted = (0, FormatDocuments_1.formatDocuments)(res.map((doc) => doc._doc));
        return new ApiResponse_1.ApiResponse(true, formatted.length === 1 ? formatted[0] : formatted);
    }
    async createCard(body) {
        const errors = await (0, class_validator_1.validate)(body);
        if (errors.length > 0) {
            throw new ApiError_1.ApiError(400, {
                message: "Validation failed",
                code: "CARD_VALIDATION_ERROR",
                errors
            });
        }
        const { boardId, title, description } = body;
        const res = await Card_model_1.default.create({ title, description });
        await Board_model_1.default.findOneAndUpdate({ _id: boardId }, {
            $push: {
                todo: res._doc._id
            }
        }, {
            new: true
        });
        return new ApiResponse_1.ApiResponse(true, (0, FormatDocuments_1.formatDocuments)(res._doc));
    }
    async updateCard(id, body) {
        const { title, description } = body;
        const data = {
            title,
            description
        };
        const errors = await (0, class_validator_1.validate)(data);
        if (errors.length > 0) {
            throw new ApiError_1.ApiError(400, {
                message: "Validation failed",
                code: "CARD_VALIDATION_ERROR",
                errors
            });
        }
        const res = await Card_model_1.default.findOneAndUpdate({ _id: id }, { $set: data }, { new: true });
        return new ApiResponse_1.ApiResponse(true, (0, FormatDocuments_1.formatDocuments)(res._doc));
    }
    async deleteBoard(boardId, id) {
        const res = await Card_model_1.default.findOneAndDelete({ _id: id });
        if (!res) {
            throw new ApiError_1.ApiError(404, {
                code: "CARD_NOT_FOUND",
                message: `Card with id ${id} not found`
            });
        }
        await Board_model_1.default.findOneAndUpdate({ _id: boardId }, {
            $pull: {
                todo: res._doc._id,
                inProgress: res._doc._id,
                done: res._doc._id
            }
        }, {
            new: true
        });
        return new ApiResponse_1.ApiResponse(true, (0, FormatDocuments_1.formatDocuments)(res._doc));
    }
};
__decorate([
    (0, routing_controllers_1.Get)("/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], Card.prototype, "getCards", null);
__decorate([
    (0, routing_controllers_1.Post)(),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateCard_dto_1.CreateCard]),
    __metadata("design:returntype", Promise)
], Card.prototype, "createCard", null);
__decorate([
    (0, routing_controllers_1.Put)("/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreateCard_dto_1.CreateCard]),
    __metadata("design:returntype", Promise)
], Card.prototype, "updateCard", null);
__decorate([
    (0, routing_controllers_1.Delete)("/:id/board/:boardId"),
    __param(0, (0, routing_controllers_1.Param)("boardId")),
    __param(1, (0, routing_controllers_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], Card.prototype, "deleteBoard", null);
Card = __decorate([
    (0, routing_controllers_1.JsonController)("/card")
], Card);
exports.default = Card;
//# sourceMappingURL=Card.js.map