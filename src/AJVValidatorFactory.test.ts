import { AJVValidatorFactory } from './AJVValidatorFactory';
import { AppConfig } from './AppConfig';
import { TemplateModel } from './TemplateModel';
import { Validator } from './Validator';
import { ValidatorFactory } from './ValidatorFactory';

const factory: ValidatorFactory = new AJVValidatorFactory(new AppConfig());
let validator: Validator;

beforeAll(() => {
  return factory.loadValidator('example').then(result => (validator = result));
});

describe('AJVValidatorFactory', () => {
  it('can load a validator', () => {
    return expect(factory.loadValidator('example')).resolves.toBeTruthy();
  });
});

describe('Validator', () => {
  const validModel: TemplateModel = {
    name: 'Mike Walsh',
    email: 'mike@goonies.net',
    subject: 'Hidden Pirate Treasure',
    message: 'Come on guys, it will be great!',
  };
  it('properly validates a valid model', () => {
    return expect(validator.validate(validModel)).resolves.toBeTruthy();
  });

  const invalidModel: TemplateModel = {
    name: 'Mama Fratelli',
    email: 'fratelli.do',
    message: 'In go the plump fingers...',
  };
  it('properly rejects an invalid string value', () => {
    return expect(validator.validate(invalidModel)).resolves.toStrictEqual({
      isValid: false,
      invalidFields: ['email'],
      missingFields: ['subject'],
    });
  });

  const anotherInvalidModel: TemplateModel = { ...invalidModel };
  anotherInvalidModel.email = 'ma@fratelli.co';
  it('properly rejects a missing required field', () => {
    return expect(validator.validate(anotherInvalidModel)).resolves.toStrictEqual({
      isValid: false,
      invalidFields: [],
      missingFields: ['subject'],
    });
  });
});
