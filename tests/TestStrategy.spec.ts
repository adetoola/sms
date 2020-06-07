import SMS from '../src';
import { TestStrategy } from '../src/Strategies/TestStrategy';

describe('SMS', () => {
  it('should set strategy correctly', async () => {
    let sms = new SMS('Test');
    let strategy = sms.strategy;

    expect(strategy).toBeInstanceOf(TestStrategy);
  });

  it('should throw an error when message length is more than max.', async () => {
    let sms = new SMS('Test');

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

  describe('SMS.send()', () => {
    it('should send a message', async () => {
      let sms = new SMS('Test');
      sms.credentials({ sender: 'ADETOOLA' });

      const result = await sms.send('08034567890', 'NG', 'I love you, Bae', 'TEXT');
      expect(result).toBeTruthy();
    });
  });
});
