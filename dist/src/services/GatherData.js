"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GatherData_1 = require("../routers/GatherData");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.GATHERDATA_PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(GatherData_1.gatherData);
app.listen(port, () => {
    console.log('Server GatherData is running on port: ' + port);
});
