import axios from 'axios';

import SMS from '../src';
import { SMSLive247Strategy } from '../src/Strategies/SMSLive247Strategy';
import { SMS247LiveCredentialStub } from './fixtures/credentials';
import { numbers320 } from './fixtures/recipients';

jest.mock('axios');
beforeEach(() => {
  // @ts-ignore
  axios.get.mockClear();
});

afterEach(() => {
  // @ts-ignore
  axios.get.mockClear();
});

describe('SMS', () => {
  it('should set strategy correctly', async () => {
    let sms = new SMS('SMSLive247');
    let strategy = sms.strategy;

    expect(strategy).toBeInstanceOf(SMSLive247Strategy);
  });

  it('should throw an error when message length is more than max.', async () => {
    let sms = new SMS('SMSLive247');

    const err = async () => {
      await sms.send(
        '08034567890',
        'NG',
        'qwwwwwryryr qwwwwwryryr qwwwwwryryr qwwwwwryryr qwwwwwryryr qwwwwwryryr qwwwwwryryr qwwwwwryryr qwwwwwryryr qwwwwwryryr qwwwwwryryr qwwwwwryryr qwwwwwryryr qwwwwwryryr qwwwwwryryr qwwwwwryryr ',
        'TEXT'
      );
    };

    await expect(err()).rejects.toThrow();
  });

  describe('SMS.sender()', () => {
    it('should throw an error when sender is invalid', async () => {
      let sms = new SMS('SMSLive247');
      function err() {
        return sms.sender('ADETOOLAADETOOLA');
      }
      expect(err).toThrow();
    });
  });

  describe('SMS.send()', () => {
    it('should send a message', async () => {
      let sms = new SMS('SMSLive247');
      sms.credentials(SMS247LiveCredentialStub);

      // @ts-ignore
      axios.get.mockResolvedValue({ data: 'OK: 94936219' });
      const result = await sms.send('08134567890', 'NG', 'I love you, Bae', 'TEXT');
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(result).toEqual(['OK: 94936219']);
    });

    it('should batch messages when more than send limit', async () => {
      let sms = new SMS('SMSLive247');
      sms.credentials(SMS247LiveCredentialStub);

      // @ts-ignore
      axios.get.mockResolvedValue({ data: 'OK: 94936219' });
      const result = await sms.send(numbers320, 'NG', 'I love you, Bae', 'TEXT');
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(result).toEqual(['OK: 94936219']);
    });
  });
});
