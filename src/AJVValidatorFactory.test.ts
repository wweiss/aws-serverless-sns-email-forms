import { AJVValidatorFactory } from './AJVValidatorFactory';
import { FileDocumentFactory } from './FileDocumentFactory';
import { TemplateModel } from './TemplateModel';
import { Validator } from './Validator';
import { ValidatorFactory } from './ValidatorFactory';

const factory: ValidatorFactory = new AJVValidatorFactory(new FileDocumentFactory('./test'));
let validator: Validator;

beforeAll(() => {
  return factory.loadValidator('test-template.json').then(result => (validator = result));
});

describe('AJVValidatorFactory', () => {
  it('can load a validator', () =>
    factory.loadValidator('test-template.json').then(schema => expect(schema).toBeTruthy()));
});

describe('Validator', () => {
  const validModel: TemplateModel = {
    name: 'Mike Walsh',
    email: 'mike@goonies.net',
    subject: 'Hidden Pirate Treasure',
    message: 'Come on guys, it will be great!',
  };
  it('properly validates a valid model', () =>
    validator.validate(validModel).then(result => expect(result).toBeTruthy()));

  const invalidModel: TemplateModel = {
    name: 'Mama Fratelli',
    email: 'fratelli.evil',
    message: 'In go the plump fingers...',
  };
  it('properly rejects an invalid string value', () =>
    validator
      .validate(invalidModel)
      .then()
      .catch(err => expect(err).toBeTruthy()));

  invalidModel.email = 'ma@fratelli.co';
  it('properly rejects a missing required field', () =>
    validator
      .validate(invalidModel)
      .then()
      .catch(err => expect(err).toBeTruthy()));
});
