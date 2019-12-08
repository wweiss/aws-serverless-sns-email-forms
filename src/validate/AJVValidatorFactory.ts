import { Logger, LoggerFactory } from '@codification/cutwater-logging';
import * as Ajv from 'ajv';
import { DocumentLoaderBasedFactory } from '../document';
import { NameValueModel } from '../NameValueModel';
import { ValidationFailure, Validator, ValidatorFactory } from './ValidatorFactory';

const LOG: Logger = LoggerFactory.getLogger();
const MISSING_PROPERTY: string = 'missingProperty';
const ADDIONTIAL_PROPERTY: string = 'additionalProperty';

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

  public validate(model: NameValueModel): Promise<void> {
    const isValid = this.validator(model);
    if (typeof isValid === 'boolean') {
      return this.toValidationResult(isValid);
    } else {
      return isValid.then(result => this.toValidationResult(result)) as Promise<void>;
    }
  }

  private toValidationResult(isValid: boolean): Promise<void> {
    if (this.validator.errors) {
      LOG.debug('Validation failed: ', this.validator.errors);
      const rval: ValidationFailure = { invalidFields: [], missingFields: [] };
      rval.invalidFields = this.toInvalidFields(this.validator.errors);
      rval.missingFields = this.toMissingFields(this.validator.errors);
      return Promise.reject(rval);
    }
    return Promise.resolve();
  }

  private toInvalidFields(errors: Ajv.ErrorObject[]): string[] {
    const rval: string[] = [];
    errors.forEach(error => {
      if (error.dataPath.trim().length > 0) {
        rval.push(error.dataPath.substr(1));
      } else if (error.params && error.params[ADDIONTIAL_PROPERTY]) {
        rval.push(error.params[ADDIONTIAL_PROPERTY]);
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
