import { NameValueModel } from '../NameValueModel';

export interface MessageTemplate {
  fill(model: NameValueModel): string;
}

export interface TemplateFactory {
  loadMessageTemplate(name: string): Promise<MessageTemplate>;
}
