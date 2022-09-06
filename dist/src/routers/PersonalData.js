"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const idValidation_1 = require("../middleware/idValidation");
const PersonalDataMapper_1 = require("../mapper/PersonalDataMapper");
const Rabbitmq_1 = require("../routers/Rabbitmq");
require('dotenv').config();
const options = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${process.env.GOREST_ACCESS_TOKEN}`
    }
};
exports.router.post('/api/v1/commands/run', idValidation_1.validateId, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.body.id);
    try {
        const apiData = yield axios_1.default.get(`https://gorest.co.in/public/v1/users?id=${userId}`, options);
        const data = apiData.data.data[0];
        if (!data)
            return res.status(404).send();
        const formattedData = (0, PersonalDataMapper_1.dataMapper)(data);
        (0, Rabbitmq_1.sendMessage)(JSON.stringify(formattedData));
        res.send(formattedData);
    }
    catch (e) {
        res.status(500).send();
    }
}));
