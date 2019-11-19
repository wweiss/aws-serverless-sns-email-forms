import * as Ajv from 'ajv';
import { AbstractDocumentBasedFactory } from './AbstractDocumentBasedFactory';
import { Validator } from './Validator';
import { ValidatorFactory } from './ValidatorFactory';

export class AJVValidatorFactory extends AbstractDocumentBasedFactory implements ValidatorFactory {
  public loadValidator(name: string): Promise<Validator> {
    return this.loadDocument(name).then(document => {
      return new AJVValidator(JSON.parse(document));
    });
  }
}

// tslint:disable-next-line: max-classes-per-file
class AJVValidator implements Validator {
  private validator: Ajv.ValidateFunction;

  constructor(schema: object) {
    const ajv = new Ajv();
    this.validator = ajv.compile(schema);
  }

  public validate(formData: object): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const isValid = this.validator(formData);
      if (isValid) {
        resolve(true);
      } else {
        reject(this.validator.errors);
      }
    });
  }
}
