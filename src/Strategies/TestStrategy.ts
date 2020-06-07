import { CountryCode } from 'libphonenumber-js';
import chunk from 'lodash/chunk';

import { InvalidArgsError } from '../utils/errors/InvalidArgsError';
import { SMSStrategy } from './SMSStrategy';
import { messageType, Strategy } from './Strategy';

export type TestCredential = {
  sender: string;
};

export class TestStrategy extends SMSStrategy implements Strategy {
  constructor() {
    super();
  }

  protected readonly MAX_MSG_GET = 100;

  protected _credentials!: TestCredential;

  credentials(credentials: TestCredential): TestStrategy {
    this._credentials = credentials;
    return this;
  }

  async send(
    recipient: string | string[],
    country: CountryCode,
    message: string,
    type: messageType = 'TEXT'
  ): Promise<string | string[]> {
    const msg = this.sanitizeMessage(message);
    if (!this.isValidMessageLength(msg)) {
      throw new InvalidArgsError(`Message length should be ${this.length} characters or less`);
    }

    const recipients = this.getValidRecipients(recipient, country);

    const chunked: string[][] = chunk(recipients, this.MAX_MSG_GET);

    return Promise.all(
      chunked.map(async (chk) => {
        const buildMessage = (message: string, sender: string, sendto: string, msgtype: messageType) => `
          TOTAL RECIPIENTS: ${recipients.length}
          *******\n
          SENDER: ${sender}
          TO: ${sendto}
          MESSAGE: ${message}
          MESSAGE TYPE: ${msgtype}
        `;

        const res = buildMessage(msg, this._credentials.sender, chk.join(','), type);

        console.log(res);

        return await Promise.resolve(Math.floor(Math.random() * 1000000).toString());
      })
    );
  }
}
