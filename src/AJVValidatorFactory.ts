import * as Ajv from 'ajv';
import { DocumentLoaderBasedFactory } from './DocumentLoaderBasedFactory';
import { ValidationResult, Validator } from './Validator';
import { ValidatorFactory } from './ValidatorFactory';

const MISSING_PROPERTY: string = 'missingProperty';

export class AJVValidatorFactory extends DocumentLoaderBasedFactory implements ValidatorFactory {
  public loadValidator(name: string): Promise<Validator> {
    return this.loadDocument(`${name}.schema.json`).then(document => {
      return new AJVValidator(JSON.parse(document));
    });
  }
}

// tslint:disable-next-line: max-classes-per-file
class AJVValidator implements Validator {
  private validator: Ajv.ValidateFunction;

  constructor(schema: object) {
    const ajv = new Ajv({ allErrors: true });
    this.validator = ajv.compile(schema);
  }

  public validate(formData: object): Promise<ValidationResult> {
    const isValid = this.validator(formData);
    if (typeof isValid === 'boolean') {
      const result = this.toValidationResult(isValid);
      return Promise.resolve(result);
    } else {
      return Promise.resolve(isValid.then(result => this.toValidationResult(result)));
    }
  }

  private toValidationResult(isValid: boolean): ValidationResult {
    const rval: ValidationResult = { isValid, invalidFields: [], missingFields: [] };
    if (this.validator.errors) {
      rval.invalidFields = this.toInvalidFields(this.validator.errors);
      rval.missingFields = this.toMissingFields(this.validator.errors);
    }
    return rval;
  }

  private toInvalidFields(errors: Ajv.ErrorObject[]): string[] {
    const rval: string[] = [];
    errors.forEach(error => {
      if (error.dataPath.trim().length > 0) {
        rval.push(error.dataPath.substr(1));
      }
    });
    return rval;
  }

  private toMissingFields(errors: Ajv.ErrorObject[]): string[] {
    const rval: string[] = [];
    errors.forEach(error => {
      if (error.params && error.params[MISSING_PROPERTY]) {
        rval.push(error.params[MISSING_PROPERTY]);
      }
    });
    return rval;
  }
}
