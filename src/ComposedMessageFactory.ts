import { Message } from './Message';
import { MessageCommand, MessageCommandSchema } from './MessageCommand';
import { MessageFactory } from './MessageFactory';
import { MessageTransformer } from './MessageTransformer';
import { ValidationResult } from './Validator';
import { ValidatorFactory } from './ValidatorFactory';

export class ComposedMessageFactory implements MessageFactory {
  constructor(private validatorFactory: ValidatorFactory, private messageTransformer: MessageTransformer) {}

  public createMessage(cmd: MessageCommand): Promise<Message | ValidationResult> {
    return this.validateMessageCommand(cmd)
      .then(rval => this.validateMessageModel(rval))
      .then(rval => this.generateMessage(rval))
      .catch(result => result);
  }

  private validateMessageCommand(cmd: MessageCommand): Promise<MessageCommand> {
    return new Promise((resolve, reject) => {
      this.validatorFactory.loadValidator(MessageCommandSchema).then(validator => {
        return validator.validate(cmd).then(result => {
          result.isValid ? resolve(cmd) : reject(result);
        });
      });
    });
  }

  private validateMessageModel(cmd: MessageCommand): Promise<MessageCommand> {
    return new Promise((resolve, reject) => {
      this.validatorFactory.loadValidator(cmd.form).then(validator => {
        validator.validate(cmd.messageModel).then(result => {
          result.isValid ? resolve(cmd) : reject(result);
        });
      });
    });
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
