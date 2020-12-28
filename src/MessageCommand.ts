import { NameValueModel } from './NameValueModel';

export interface MessageCommand extends NameValueModel {
  form: string;
  token?: string;
  from: string;
  subject: string;
  messageModel: NameValueModel;
}

export const MessageCommandSchema: any = {
  type: 'object',
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
