"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Tcp_1 = require("./Tcp");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class App {
    constructor() {
        this.tcp = new Tcp_1.Tcp();
        if (!App.instance) {
            App.instance = this;
        }
        return App.instance;
    }
    async init() {
        const { tcp } = this;
        console.log("App started");
        await this.connectDatabase();
        await tcp.init();
        return true;
    }
    async connectDatabase() {
        const dbUri = process.env.DB_URI;
        if (!dbUri) {
            console.error("MongoDB URI is not defined in environment variables");
            process.exit(1);
        }
        try {
            await mongoose_1.default.connect(dbUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log("MongoDB connected successfully");
        }
        catch (error) {
            console.error("MongoDB connection error:", error);
            process.exit(1);
        }
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map