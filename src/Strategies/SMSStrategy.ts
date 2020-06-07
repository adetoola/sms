import { CountryCode, parsePhoneNumber } from 'libphonenumber-js';
import isArray from 'lodash/isArray';
import uniq from 'lodash/uniq';

export abstract class SMSStrategy {
  protected readonly length: number = 160;

  protected sanitizeMessage(str: string): string {
    return str.trim().replace(/\s+/g, ' ');
  }

  protected isValidMessageLength(msg: string): boolean {
    return msg.length > this.length ? false : true;
  }

  protected getValidRecipients(recipients: string | string[], country?: CountryCode): string[] {
    const numbers = this.getUniqueRecipients(recipients);

    const validRecipients = numbers
      .map((number) => {
        const phoneNumber = parsePhoneNumber(number, country);
        if (phoneNumber.isValid()) {
          return phoneNumber.number;
        }
      })
      .filter(Boolean);

    if (validRecipients.length === 0) {
      throw new Error('No valid recipient in the input');
    }
    return validRecipients as any;
  }

  private getUniqueRecipients(recipients: string | string[]): string[] {
    return isArray(recipients) ? uniq(recipients) : uniq(recipients.split(','));
  }
}
