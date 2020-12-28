import { Logger, LoggerFactory } from '@codification/cutwater-logging';
import Ajv, { ErrorObject, ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import { DocumentLoaderBasedFactory } from '../document';
import { NameValueModel } from '../NameValueModel';
import { ValidationFailure, Validator, ValidatorFactory } from './ValidatorFactory';

const LOG: Logger = LoggerFactory.getLogger();
const MISSING_PROPERTY: string = 'missingProperty';
const ADDIONTIAL_PROPERTY: string = 'additionalProperty';

export class AJVValidatorFactory extends DocumentLoaderBasedFactory implements ValidatorFactory {
  public async loadValidator(schema: string | object): Promise<Validator> {
    if (typeof schema === 'object') {
      return new AJVValidator(schema);
    } else {
      try {
        return new AJVValidator(JSON.parse(await this.loadDocument(`${schema}.schema.json`)));
      } catch (err) {
        throw new Error(`Failed to create validator from schema[${schema}] with the following error: ${err.message}`);
      }
    }
  }
}

// tslint:disable-next-line: max-classes-per-file
class AJVValidator implements Validator {
  private validator: ValidateFunction;

  constructor(schema: object) {
    const ajv = new Ajv({ allErrors: true });
    addFormats(ajv);
    this.validator = ajv.compile(schema);
  }

  public async validate(model: NameValueModel): Promise<void> {
    const isValid = this.validator(model);
    if (typeof isValid === 'boolean') {
      this.toValidationResult(isValid);
    } else {
      this.toValidationResult(await isValid);
    }
  }

  private toValidationResult(isValid: boolean): void {
    if (this.validator.errors) {
      LOG.debug('Validation failed: ', this.validator.errors);
      const rval: ValidationFailure = { invalidFields: [], missingFields: [] };
      rval.invalidFields = this.toInvalidFields(this.validator.errors);
      rval.missingFields = this.toMissingFields(this.validator.errors);
      throw rval;
    }
  }

  private toInvalidFields(errors: ErrorObject[]): string[] {
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

  private toMissingFields(errors: ErrorObject[]): string[] {
    const rval: string[] = [];
    errors.forEach(error => {
      if (error.params && error.params[MISSING_PROPERTY]) {
        rval.push(error.params[MISSING_PROPERTY]);
      }
    });
    return rval;
  }
}
