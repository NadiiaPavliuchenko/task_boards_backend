"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const Board_1 = __importDefault(require("./board/Board"));
const Card_1 = __importDefault(require("./card/Card"));
const controllers = [Board_1.default, Card_1.default];
exports.controllers = controllers;
//# sourceMappingURL=index.js.map