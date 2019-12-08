import { MessageValidator } from '.';
import { MessageCommand } from '../MessageCommand';
import { VALIDATOR_FACTORY } from '../TestConfig.test';

describe('MessageValidator class', () => {
  const validator: MessageValidator = new MessageValidator(VALIDATOR_FACTORY);

  const invalidFormCommand: MessageCommand = {
    form: 'doesNotExist',
    from: 'ma@baddies.net',
    subject: 'We got the Kid!',
    messageModel: {
      name: 'Mama Fratelli',
      message: 'In go the plump fingers...',
    },
  };

  it('will reject commands with missing template data', () => {
    return expect(validator.validate(invalidFormCommand)).rejects.toStrictEqual({
      invalidFields: ['form'],
      missingFields: [],
    });
  });

  const validCommand: MessageCommand = {
    form: 'example',
    from: 'ma@baddies.net',
    subject: 'We got the Kid!',
    messageModel: {
      name: 'Mama Fratelli',
      message: 'In go the plump fingers...',
    },
  };

  it('can validate a valid command', () => {
    return expect(validator.validate(validCommand)).resolves.toBeUndefined();
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
    return expect(validator.validate(badEmailCommand)).rejects.toStrictEqual({
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
    return expect(validator.validate(missingModelFieldCommand)).rejects.toStrictEqual({
      invalidFields: [],
      missingFields: ['name'],
    });
  });
});
