import { MessageCommand } from '../MessageCommand';
import { Validator } from '../validate';
import { Message, MessageFactory } from './MessageFactory';
import { MessageTransformer } from './MessageTransformer';

export class ValidatingMessageFactory implements MessageFactory {
  constructor(private messageValidator: Validator, private messageTransformer: MessageTransformer) {}

  public async createMessage(cmd: MessageCommand): Promise<Message> {
    return this.messageValidator.validate(cmd).then(() => this.generateMessage(cmd));
  }

  private async generateMessage(cmd: MessageCommand): Promise<Message> {
    return {
      body: await this.messageTransformer.transform(cmd),
      from: cmd.from,
      subject: cmd.subject,
    };
  }
}
