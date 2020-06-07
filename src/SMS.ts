import { CountryCode } from 'libphonenumber-js';

import { SMSLive247Strategy } from './Strategies/SMSLive247Strategy';
import { Credential, messageType, Strategy } from './Strategies/Strategy';
import { TestStrategy } from './Strategies/TestStrategy';
import { InvalidArgsError } from './utils/errors/InvalidArgsError';

export type strategyTypes = 'SMSLive247' | 'Test';

export class SMS {
  /**
   * Pass SMS Strategy to use
   * @type class
   */
  protected _strategy!: Strategy;
  protected _sender!: string;
  protected validRegex = /^[A-Za-z-_0-9]{1,11}$/;

  constructor(strategy: strategyTypes) {
    this.gateway(strategy);
  }

  private gateway(strategy: strategyTypes): this {
    switch (strategy) {
      case 'SMSLive247':
        this._strategy = new SMSLive247Strategy();
        break;
      case 'Test':
        this._strategy = new TestStrategy();
        break;
      default:
        throw new Error('Unrecognised Gateway! Please check, your inputs');
    }

    return this;
  }

  get strategy(): Strategy {
    return this._strategy;
  }

  /**
   * Add default sender for all messages.
   *
   * This sender will be used for all messages unless it is overwritten later.
   *
   * @param sender string
   */
  sender(sender: string): this {
    if (!this.validRegex.test(sender))
      throw new InvalidArgsError('Sender must be alphanumeric and cannot be longer than 11 characters.');

    this._sender = sender;

    return this;
  }

  /**
   * Set up credentials needed by the provider
   *
   * @param credentials Credential
   */
  credentials(credentials: Credential): this {
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
  send(
    recipient: string | string[],
    country: CountryCode,
    message: string,
    messageType: messageType
  ): Promise<string | string[]> {
    return this.strategy.send(recipient, country, message, messageType);
  }
}
