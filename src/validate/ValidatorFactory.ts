import { NameValueModel } from '../template';

export interface ValidationFailure {
  missingFields: string[];
  invalidFields: string[];
}

export const isValidationFailure = (err: any): boolean => {
  return (err as ValidationFailure).missingFields !== undefined;
};

export interface Validator {
  validate(model: NameValueModel): Promise<void>;
}

export interface ValidatorFactory {
  loadValidator(schema: string | Record<string, unknown> | Validator): Promise<Validator>;
}
