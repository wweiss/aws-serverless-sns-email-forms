import { TemplateModel } from './TemplateModel';

export interface ValidationResult {
  isValid: boolean;
  missingFields: string[];
  invalidFields: string[];
}

export interface Validator {
  validate(model: TemplateModel): Promise<ValidationResult>;
}
