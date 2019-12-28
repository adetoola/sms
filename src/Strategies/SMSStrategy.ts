import isArray from 'lodash/isArray';
import uniq from 'lodash/uniq';

export abstract class SMSStrategy {
  protected readonly length: number = 160;

  protected sanitizeMessage(str: string): string {
    return str.trim().replace(/\s+/g, ' ');
  }

  protected isValidMessageLength(msg: string): Boolean {
    return msg.length > this.length ? false : true;
  }

  // TODO: ValidateRecipients();

  protected getUniqueRecipients(recipients: string | string[]): string[] {
    return isArray(recipients) ? uniq(recipients) : [recipients];
  }
}
