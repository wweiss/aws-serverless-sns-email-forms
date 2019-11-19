import { TemplateModel } from './TemplateModel';

export interface Validator {
  validate(formModel: TemplateModel): Promise<boolean>;
}
