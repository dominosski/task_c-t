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
exports.gatherData = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const fs_1 = __importDefault(require("fs"));
var channel, connection;
const gatherData = function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const amqpServer = "amqp://localhost:5672";
            connection = yield amqplib_1.default.connect(amqpServer);
            channel = yield connection.createChannel();
            yield channel.assertQueue("personal-data");
            channel.consume("personal-data", (data) => {
                if (data) {
                    fs_1.default.appendFile('../TASK_C-T/apiData.txt', data.content + '\n', (err) => {
                        if (err)
                            throw err;
                    });
                    channel.ack(data);
                    return data.content;
                }
            });
        }
        catch (e) {
            console.log(e);
            yield channel.close();
            yield connection.close();
        }
    });
};
exports.gatherData = gatherData;
(0, exports.gatherData)();
exports.default = exports.gatherData;
