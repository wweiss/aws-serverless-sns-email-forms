import { MessageCommand } from '../MessageCommand';
import { Validator } from '../validate';
import { Message, MessageFactory } from './MessageFactory';
import { MessageTransformer } from './MessageTransformer';

export class ValidatingMessageFactory implements MessageFactory {
  constructor(private messageValidator: Validator, private messageTransformer: MessageTransformer) {}

  public createMessage(cmd: MessageCommand): Promise<Message> {
    return this.messageValidator.validate(cmd).then(() => this.generateMessage(cmd));
  }

  private generateMessage(cmd: MessageCommand): Promise<Message> {
    return this.messageTransformer.transform(cmd).then(body => {
      return Promise.resolve({
        from: cmd.from,
        subject: cmd.subject,
        body,
      });
    });
  }
}
