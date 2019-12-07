import { MessageCommand } from '../MessageCommand';
import { MESSAGE_TRANSFORMER, VALIDATOR_FACTORY } from '../TestConfig.test';
import { MessageValidator } from '../validate';
import { Message, MessageFactory } from './MessageFactory';
import { ValidatingMessageFactory } from './ValidatingMessageFactory';

describe('ValidatingMessageFactory class', () => {
  const msgFactory: MessageFactory = new ValidatingMessageFactory(
    new MessageValidator(VALIDATOR_FACTORY),
    MESSAGE_TRANSFORMER,
  );

  const validCommand: MessageCommand = {
    form: 'example',
    from: 'ma@baddies.net',
    subject: 'We got the Kid!',
    messageModel: {
      name: 'Mama Fratelli',
      message: 'In go the plump fingers...',
    },
  };

  const expectedMessage: Message = {
    from: validCommand.from,
    subject: validCommand.subject,
    body: 'Mama Fratelli says: In go the plump fingers...',
  };

  it('can produce a valid message from a valid command', () => {
    return expect(msgFactory.createMessage(validCommand)).resolves.toStrictEqual(expectedMessage);
  });

  const badEmailCommand: MessageCommand = {
    form: 'example',
    from: 'baddies.net',
    subject: 'We got the Kid!',
    messageModel: {
      message: 'In go the plump fingers...',
      name: 'Jo',
    },
  };

  it('returns validation errors for invalid email address', () => {
    return expect(msgFactory.createMessage(badEmailCommand)).rejects.toStrictEqual({
      invalidFields: ['from'],
      missingFields: [],
    });
  });

  const missingModelFieldCommand: MessageCommand = {
    form: 'example',
    from: 'ma@baddies.net',
    subject: 'We got the Kid!',
    messageModel: {
      message: 'In go the plump fingers...',
    },
  };

  it('returns validation errors for missing model fields', () => {
    return expect(msgFactory.createMessage(missingModelFieldCommand)).rejects.toStrictEqual({
      invalidFields: [],
      missingFields: ['name'],
    });
  });
});
