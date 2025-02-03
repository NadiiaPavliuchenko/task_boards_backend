"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BoardSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    todo: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Card",
            required: true
        }
    ],
    inProgress: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Card",
            required: true
        }
    ],
    done: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Card",
            required: true
        }
    ]
}, { versionKey: false });
const Board = mongoose_1.default.models.Board || mongoose_1.default.model("Board", BoardSchema);
exports.default = Board;
//# sourceMappingURL=Board.model.js.map