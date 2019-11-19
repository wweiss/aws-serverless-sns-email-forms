import { MessageTemplate } from './MessageTemplate';

export interface TemplateFactory {
  loadMessageTemplate(name: string): Promise<MessageTemplate>;
}
