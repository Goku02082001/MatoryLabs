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
const express_1 = __importDefault(require("express"));
const userModel_1 = __importDefault(require("../models/userModel"));
const client_1 = require("@temporalio/client");
const router = express_1.default.Router();
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOne({ authId: req.params.id });
    console.log('User found:', user);
    res.json(user);
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield client_1.Connection.connect();
    const client = new client_1.WorkflowClient({ connection });
    try {
        yield client.start('updateUserWorkflow', {
            args: [req.body],
            taskQueue: 'user-queue',
            workflowId: `update-${req.body._id || req.body.authId}-${Date.now()}`,
        });
        res.json({ message: 'User sync workflow started' });
    }
    catch (err) {
        console.error(' Workflow start failed:', err);
        res.status(500).json({ error: 'Workflow failed to start' });
    }
}));
exports.default = router;
