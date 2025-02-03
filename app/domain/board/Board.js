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
const Board_model_1 = __importDefault(require("./Board.model"));
const ApiResponse_1 = require("../../../helpers/ApiResponse");
const ApiError_1 = require("../../../helpers/ApiError");
const class_validator_1 = require("class-validator");
const CreateBoard_dto_1 = require("./CreateBoard.dto");
const FormatDocuments_1 = require("../../../helpers/FormatDocuments");
const Card_model_1 = __importDefault(require("../card/Card.model"));
let Board = class Board {
    async getAll() {
        const res = await Board_model_1.default.find({}).sort({ _id: -1 });
        return new ApiResponse_1.ApiResponse(true, (0, FormatDocuments_1.formatDocuments)(res.map((doc) => doc._doc)));
    }
    async getOne(id) {
        const res = await Board_model_1.default.findOne({ _id: id });
        if (!res) {
            throw new ApiError_1.ApiError(404, {
                code: "BOARD_NOT_FOUND",
                message: `Board with id ${id} not found`
            });
        }
        return new ApiResponse_1.ApiResponse(true, (0, FormatDocuments_1.formatDocuments)(res._doc));
    }
    async createBoard(body) {
        const errors = await (0, class_validator_1.validate)(body);
        if (errors.length > 0) {
            throw new ApiError_1.ApiError(400, {
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
        const res = await Board_model_1.default.create(newBoard);
        return new ApiResponse_1.ApiResponse(true, (0, FormatDocuments_1.formatDocuments)(res._doc));
    }
    async updateBoard(id, body) {
        const errors = await (0, class_validator_1.validate)(body);
        if (errors.length > 0) {
            throw new ApiError_1.ApiError(400, {
                message: "Validation failed",
                code: "BOARD_VALIDATION_ERROR",
                errors
            });
        }
        const res = await Board_model_1.default.findOneAndUpdate({ _id: id }, { $set: body }, { new: true });
        return new ApiResponse_1.ApiResponse(true, (0, FormatDocuments_1.formatDocuments)(res._doc));
    }
    async moveCardBetweenColumns(boardId, body) {
        const errors = await (0, class_validator_1.validate)(body);
        if (errors.length > 0) {
            throw new ApiError_1.ApiError(400, {
                message: "Validation failed",
                code: "CARD_MOVE_VALIDATION_ERROR",
                errors
            });
        }
        const { cardId, fromColumnId, toColumnId } = body;
        await Board_model_1.default.updateOne({ _id: boardId }, { $pull: { [`${fromColumnId}`]: cardId } });
        await Board_model_1.default.updateOne({ _id: boardId }, { $push: { [`${toColumnId}`]: cardId } });
        const updatedBoard = await Board_model_1.default.findById(boardId);
        return new ApiResponse_1.ApiResponse(true, (0, FormatDocuments_1.formatDocuments)(updatedBoard._doc));
    }
    async updateColumnOrder(boardId, columnId, body) {
        const errors = await (0, class_validator_1.validate)(body);
        if (errors.length > 0) {
            throw new ApiError_1.ApiError(400, {
                message: "Validation failed",
                code: "ORDER_VALIDATION_ERROR",
                errors
            });
        }
        const res = await Board_model_1.default.findOneAndUpdate({ _id: boardId }, { $set: { [`${columnId}`]: body.cards } }, { new: true });
        return new ApiResponse_1.ApiResponse(true, (0, FormatDocuments_1.formatDocuments)(res._doc));
    }
    async deleteBoard(id) {
        const boardToDelete = await Board_model_1.default.findOne({ _id: id });
        if (!boardToDelete) {
            throw new ApiError_1.ApiError(404, {
                code: "BOARD_NOT_FOUND",
                message: `Board with id ${id} not found`
            });
        }
        const allCardIds = [
            ...boardToDelete.todo,
            ...boardToDelete.inProgress,
            ...boardToDelete.done
        ]
            .map((card) => (card.$oid ? card.$oid.toString() : null))
            .filter((cardId) => cardId !== null);
        await Card_model_1.default.deleteMany({
            _id: { $in: allCardIds }
        });
        const res = await Board_model_1.default.findOneAndDelete({ _id: id });
        if (!res) {
            throw new ApiError_1.ApiError(404, {
                code: "BOARD_NOT_FOUND",
                message: `Board with id ${id} not found`
            });
        }
        return new ApiResponse_1.ApiResponse(true, (0, FormatDocuments_1.formatDocuments)(res._doc));
    }
};
__decorate([
    (0, routing_controllers_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Board.prototype, "getAll", null);
__decorate([
    (0, routing_controllers_1.Get)("/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], Board.prototype, "getOne", null);
__decorate([
    (0, routing_controllers_1.Post)(),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateBoard_dto_1.CreateBoard]),
    __metadata("design:returntype", Promise)
], Board.prototype, "createBoard", null);
__decorate([
    (0, routing_controllers_1.Patch)("/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreateBoard_dto_1.UpdateBoard]),
    __metadata("design:returntype", Promise)
], Board.prototype, "updateBoard", null);
__decorate([
    (0, routing_controllers_1.Patch)("/:boardId/move-card"),
    __param(0, (0, routing_controllers_1.Param)("boardId")),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], Board.prototype, "moveCardBetweenColumns", null);
__decorate([
    (0, routing_controllers_1.Patch)("/:boardId/columns/:columnId"),
    __param(0, (0, routing_controllers_1.Param)("boardId")),
    __param(1, (0, routing_controllers_1.Param)("columnId")),
    __param(2, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], Board.prototype, "updateColumnOrder", null);
__decorate([
    (0, routing_controllers_1.Delete)("/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], Board.prototype, "deleteBoard", null);
Board = __decorate([
    (0, routing_controllers_1.JsonController)("/board")
], Board);
exports.default = Board;
//# sourceMappingURL=Board.js.map