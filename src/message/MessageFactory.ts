import { MessageCommand } from '../MessageCommand';

export interface Message {
  from: string;
  subject: string;
  body: string;
}

export interface MessageFactory {
  createMessage(cmd: MessageCommand): Promise<Message>;
}
