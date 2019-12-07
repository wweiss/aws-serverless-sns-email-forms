import { Message } from '../message';

export interface MessageSender {
  send(message: Message): Promise<void>;
}
