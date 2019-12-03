import { TemplateModel } from './TemplateModel';

export interface MessageCommand {
  form: string;
  token?: string;
  from: string;
  subject: string;
  messageModel: TemplateModel;
}

export const MessageCommandSchema: any = {
  required: ['form', 'from', 'subject', 'messageModel'],
  properties: {
    form: { type: 'string' },
    token: { type: 'string' },
    from: {
      type: 'string',
      format: 'email',
    },
    subject: { type: 'string' },
    messageModel: { type: 'object' },
  },
  additionalProperties: false,
};
