"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CardSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    description: String
}, { versionKey: false });
const Card = mongoose_1.default.models.Card || mongoose_1.default.model("Card", CardSchema);
exports.default = Card;
//# sourceMappingURL=Card.model.js.map