import { TemplateModel } from './TemplateModel';

export interface MessageCommand {
  form: string;
  token?: string;
  messageModel: TemplateModel;
}
