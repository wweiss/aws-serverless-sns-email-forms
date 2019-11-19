import { TemplateModel } from './TemplateModel';

export interface MessageTemplate {
  fill(templateValues: TemplateModel): string;
}
