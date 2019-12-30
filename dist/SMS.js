"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InvalidArgsError_1 = require("./Errors/InvalidArgsError");
const SMSLive247Strategy_1 = require("./Strategies/SMSLive247Strategy");
class SMS {
    constructor(strategy) {
        this.validRegex = /^[A-Za-z-_0-9]{1,11}$/;
        this.gateway(strategy);
    }
    gateway(strategy) {
        switch (strategy) {
            case 'SMSLive247':
                this._strategy = new SMSLive247Strategy_1.SMSLive247Strategy();
                break;
            default:
                throw new Error('Unrecognised Gateway! Please check, your inputs');
        }
        return this;
    }
    get strategy() {
        return this._strategy;
    }
    /**
     * Add default sender for all messages.
     *
     * This sender will be used for all messages unless it is overwritten later.
     *
     * @param sender string
     */
    sender(sender) {
        if (!this.validRegex.test(sender))
            throw new InvalidArgsError_1.InvalidArgsError('Sender must be alphanumeric and cannot be longer than 11 characters.');
        this._sender = sender;
        return this;
    }
    /**
     * Set up credentials needed by the provider
     *
     * @param credentials Credential
     */
    credentials(credentials) {
        this.strategy.credentials(credentials);
        return this;
    }
    /**
     *  Send SMS message to recipients
     *
     * @param recipient A single formatted number or an array of numbers
     * @param message A string of 160 characters or less
     * @param messageType TEXT or FLASH
     */
    send(recipient, message, messageType) {
        return this.strategy.send(recipient, message, messageType);
    }
}
exports.SMS = SMS;
//# sourceMappingURL=SMS.js.map