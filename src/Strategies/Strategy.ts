import { CountryCode } from 'libphonenumber-js';

import { SMSLive247Credential } from './SMSLive247Strategy';

export type messageType = 'TEXT' | 'FLASH' | 'MMS';

export type Credential = SMSLive247Credential;

export interface Strategy {
  credentials(credentials: Credential): void;

  send(
    recipient: string | string[],
    country: CountryCode,
    message: string,
    type: messageType
  ): Promise<string | string[]>;

  // schedule(recipient: string | string[], message: string, datetime: Date, messageType: messageType.TEXT): void;
  // balance(): void;
  // charge(id: string): void;
  // status(id: string): void;
  // coverage(recipient: string | string[]): void;
  // stop(id: string): void;
  // history(pagesize: string, pagenumber: string, begindate: string, enddate: string, contains: string): any;
}
