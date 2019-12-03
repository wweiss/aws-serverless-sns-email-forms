import { Message } from './Message';

export interface MessageSender {
  send(message: Message, callback: (err?: any) => void): void;
}
