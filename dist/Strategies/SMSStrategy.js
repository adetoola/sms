"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isArray_1 = __importDefault(require("lodash/isArray"));
const uniq_1 = __importDefault(require("lodash/uniq"));
class SMSStrategy {
    constructor() {
        this.length = 160;
    }
    sanitizeMessage(str) {
        return str.trim().replace(/\s+/g, ' ');
    }
    isValidMessageLength(msg) {
        return msg.length > this.length ? false : true;
    }
    // TODO: ValidateRecipients();
    getUniqueRecipients(recipients) {
        return isArray_1.default(recipients) ? uniq_1.default(recipients) : [recipients];
    }
}
exports.SMSStrategy = SMSStrategy;
//# sourceMappingURL=SMSStrategy.js.map