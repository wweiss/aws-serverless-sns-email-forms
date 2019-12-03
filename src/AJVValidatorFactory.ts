import * as Ajv from 'ajv';
import { DocumentLoaderBasedFactory } from './DocumentLoaderBasedFactory';
import { TemplateModel } from './TemplateModel';
import { ValidationResult, Validator } from './Validator';
import { ValidatorFactory } from './ValidatorFactory';

const MISSING_PROPERTY: string = 'missingProperty';

export class AJVValidatorFactory extends DocumentLoaderBasedFactory implements ValidatorFactory {
  public loadValidator(schema: string | object): Promise<Validator> {
    if (typeof schema === 'object') {
      return Promise.resolve(new AJVValidator(schema));
    } else {
      return this.loadDocument(`${schema}.schema.json`).then(document => {
        return new AJVValidator(JSON.parse(document));
      });
    }
  }
}

// tslint:disable-next-line: max-classes-per-file
class AJVValidator implements Validator {
  private validator: Ajv.ValidateFunction;

  constructor(schema: object) {
    const ajv = new Ajv({ allErrors: true });
    this.validator = ajv.compile(schema);
  }

  public validate(model: TemplateModel): Promise<ValidationResult> {
    const isValid = this.validator(model);
    if (typeof isValid === 'boolean') {
      return this.toValidationResult(isValid);
    } else {
      return isValid.then(result => this.toValidationResult(result)) as Promise<ValidationResult>;
    }
  }

  private toValidationResult(isValid: boolean): Promise<ValidationResult> {
    const rval: ValidationResult = { isValid, invalidFields: [], missingFields: [] };
    if (this.validator.errors) {
      rval.invalidFields = this.toInvalidFields(this.validator.errors);
      rval.missingFields = this.toMissingFields(this.validator.errors);
    }
    return Promise.resolve(rval);
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
