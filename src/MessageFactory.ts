import { Message } from './Message';
import { MessageCommand } from './MessageCommand';
import { ValidationResult } from './Validator';

export interface MessageFactory {
  createMessage(cmd: MessageCommand): Promise<Message | ValidationResult>;
}
