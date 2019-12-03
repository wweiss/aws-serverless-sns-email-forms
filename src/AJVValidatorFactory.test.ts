import { AJVValidatorFactory } from './AJVValidatorFactory';
import { FileSystemDocumentLoader } from './FileSystemDocumentLoader';
import { MessageCommandSchema } from './MessageCommand';
import { Validator } from './Validator';
import { ValidatorFactory } from './ValidatorFactory';

const factory: ValidatorFactory = new AJVValidatorFactory(new FileSystemDocumentLoader('./test'));
let validator: Validator;

beforeAll(() => {
  return factory.loadValidator(MessageCommandSchema).then(result => (validator = result));
});

describe('AJVValidatorFactory', () => {
  it('can load a validator', () => {
    return expect(factory.loadValidator('example')).resolves.toBeTruthy();
  });
});

describe('Validator', () => {
  const validCommand: any = {
    from: 'mike@goonies.net',
    subject: 'Hidden Pirate Treasure',
    messageModel: {
      name: 'Mike Walsh',
      message: 'Come on guys, it will be great!',
    },
  };
  it('properly validates a valid message command', () => {
    return expect(validator.validate(validCommand)).resolves.toBeTruthy();
  });

  const invalidCommand: any = {
    from: 'fratelli.do',
    messageModel: {
      name: 'Mama Fratelli',
      message: 'In go the plump fingers...',
    },
  };
  it('properly rejects an invalid string email address and missing fields', () => {
    return expect(validator.validate(invalidCommand)).resolves.toStrictEqual({
      isValid: false,
      invalidFields: ['from'],
      missingFields: ['form', 'subject'],
    });
  });

  const anotherInvalidCommand: any = { ...invalidCommand };
  anotherInvalidCommand.form = 'goonies';
  anotherInvalidCommand.from = 'ma@fratelli.co';
  it('properly rejects a missing required field', () => {
    return expect(validator.validate(anotherInvalidCommand)).resolves.toStrictEqual({
      isValid: false,
      invalidFields: [],
      missingFields: ['subject'],
    });
  });
});
