import { MessageCommandSchema } from '../MessageCommand';
import { DOCUMENT_LOADER } from '../TestConfig.test';
import { AJVValidatorFactory } from './AJVValidatorFactory';
import { Validator, ValidatorFactory } from './ValidatorFactory';

const factory: ValidatorFactory = new AJVValidatorFactory(DOCUMENT_LOADER);
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
    form: 'example',
    from: 'mike@goonies.net',
    subject: 'Hidden Pirate Treasure',
    messageModel: {
      name: 'Mike Walsh',
      message: 'Come on guys, it will be great!',
    },
  };
  it('properly validates a valid message command', () => {
    return expect(validator.validate(validCommand)).resolves.toBeUndefined();
  });

  const invalidCommand: any = {
    from: 'fratelli.do',
    messageModel: {
      name: 'Mama Fratelli',
      message: 'In go the plump fingers...',
    },
  };
  it('properly rejects an invalid string email address and missing fields', () => {
    return expect(validator.validate(invalidCommand)).rejects.toStrictEqual({
      invalidFields: ['from'],
      missingFields: ['form', 'subject'],
    });
  });

  const anotherInvalidCommand: any = { ...invalidCommand };
  anotherInvalidCommand.form = 'goonies';
  anotherInvalidCommand.from = 'ma@fratelli.co';
  it('properly rejects a missing required field', () => {
    return expect(validator.validate(anotherInvalidCommand)).rejects.toStrictEqual({
      invalidFields: [],
      missingFields: ['subject'],
    });
  });

  const extraFieldModel: any = {
    name: 'Mike Walsh',
    address: '123 Washoe St.',
    message: 'Come on guys, it will be great!',
  };

  it('properly rejects a message with extra fields', () => {
    return expect(
      factory.loadValidator('example').then(result => result.validate(extraFieldModel)),
    ).rejects.toStrictEqual({
      invalidFields: ['address'],
      missingFields: [],
    });
  });
});
