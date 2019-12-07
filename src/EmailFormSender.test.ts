import { EmailFormSender } from './EmailFormSender';
import { MessageCommand } from './MessageCommand';
import { MESSAGE_FACTORY, MESSAGE_SENDER } from './TestConfig.test';

describe('EmailFormSender class', () => {
  const validCommand: MessageCommand = {
    form: 'example',
    from: 'joe@dirt.io',
    subject: 'Airplane waste management',
    messageModel: {
      name: 'Joe Dirt',
      message: 'I just found it there...',
    },
  };

  const sender: EmailFormSender = new EmailFormSender(MESSAGE_FACTORY, MESSAGE_SENDER);
  it('can send a message based on a valid command', () => {
    return expect(sender.send(validCommand)).resolves.toBeUndefined();
  });

  const invalidCommand: any = {
    form: 'example',
    from: 'dirt.io',
    messageModel: {
      name: 'Joe Dirt',
      message: 'I just found it there...',
    },
  };

  it('can reject an invalid command', () => {
    return expect(sender.send(invalidCommand)).rejects.toStrictEqual({
      invalidFields: ['from'],
      missingFields: ['subject'],
    });
  });
});
