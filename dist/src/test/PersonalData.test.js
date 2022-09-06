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
const supertest_1 = __importDefault(require("supertest"));
const PersonalData_1 = __importDefault(require("../services/PersonalData"));
describe("POST /api/v1/commands/run", () => {
    describe("given id between 10 and 20", () => {
        it("should return user object with specified id", () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 19;
            const response = yield (0, supertest_1.default)(PersonalData_1.default).post("/api/v1/commands/run").send({
                id: id
            });
            expect(response.statusCode).toBe(200);
            expect(response).not.toBe(null);
            expect(response.type).toBe('application/json');
        }));
    });
    describe("when id is NOT between 10 and 20", () => {
        it("should return error 400 bad request", () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 2;
            const response = yield (0, supertest_1.default)(PersonalData_1.default).post("/api/v1/commands/run").send({
                id: id
            });
            expect(response.statusCode).toBe(400);
            expect(response.body).toMatchObject({
                "error": "ID must be between 10 and 20"
            });
        }));
    });
    describe("when there is no user with specified ID", () => {
        it("should return error 404 not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 12;
            const response = yield (0, supertest_1.default)(PersonalData_1.default).post("/api/v1/commands/run").send({
                id: id
            });
            expect(response.statusCode).toBe(404);
        }));
    });
});
