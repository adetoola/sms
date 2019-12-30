"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const build_url_1 = __importDefault(require("build-url"));
const chunk_1 = __importDefault(require("lodash/chunk"));
const InvalidArgsError_1 = require("../Errors/InvalidArgsError");
const SMSStrategy_1 = require("./SMSStrategy");
class SMSLive247Strategy extends SMSStrategy_1.SMSStrategy {
    constructor() {
        super();
        this.api = 'http://www.smslive247.com/http/index.aspx';
        this.MAX_MSG_GET = 100;
        this.MAX_MSG_POST = 300; // Post not working, throws err 99
    }
    credentials(credentials) {
        this._credentials = credentials;
    }
    async send(recipient, message, type = 'TEXT') {
        let msg = this.sanitizeMessage(message);
        if (!this.isValidMessageLength(msg)) {
            throw new InvalidArgsError_1.InvalidArgsError(`Message length should be ${this.length} characters or less`);
        }
        const recipients = this.getUniqueRecipients(recipient);
        const chunked = chunk_1.default(recipients, this.MAX_MSG_GET);
        return Promise.all(chunked.map(async (chk) => {
            const url = build_url_1.default(this.api, {
                queryParams: {
                    cmd: 'sendmsg',
                    sessionid: this._credentials.sessionId,
                    message: msg,
                    sender: this._credentials.sender,
                    sendto: chk,
                    msgtype: this.parseMessageType(type)
                }
            });
            const { data } = await axios_1.default.get(url);
            return data;
        }));
    }
    parseMessageType(type) {
        switch (type) {
            case 'TEXT':
                return '0';
            case 'FLASH':
                return '1';
            default:
                throw new Error('Unknown message type');
        }
    }
}
exports.SMSLive247Strategy = SMSLive247Strategy;
//# sourceMappingURL=SMSLive247Strategy.js.map