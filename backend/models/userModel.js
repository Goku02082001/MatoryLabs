"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    authId: String,
    firstName: String,
    lastName: String,
    phone: String,
    city: String,
    pincode: String,
});
exports.default = mongoose_1.default.model('userForm', userSchema);
