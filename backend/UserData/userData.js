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
exports.saveToDB = saveToDB;
exports.saveToCrudCrud = saveToCrudCrud;
const axios_1 = __importDefault(require("axios"));
const userModel_1 = __importDefault(require("../models/userModel"));
function saveToDB(data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield userModel_1.default.findOneAndUpdate({ authId: data.authId }, data, { upsert: true, new: true });
    });
}
function saveToCrudCrud(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const api = process.env.CRUD_CRUD_API;
        yield axios_1.default.post(`${api}/profile`, data);
    });
}
