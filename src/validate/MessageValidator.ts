import { Validator, ValidatorFactory } from '.';
import { MessageCommand, MessageCommandSchema } from '../MessageCommand';
import { GoogleReCaptchaValidator } from './GoogleReCaptchaValidator';

export class MessageValidator implements Validator {
  public constructor(
    private factory: ValidatorFactory,
    private catpchaValidator: Validator = new GoogleReCaptchaValidator(),
  ) {}

  public validate(cmd: MessageCommand): Promise<void> {
    return this.validateMessageCommand(cmd)
      .then(rval => this.validateCaptcha(rval))
      .then(rval => this.validateMessageModel(rval))
      .then(() => Promise.resolve());
  }

  private validateMessageCommand(cmd: MessageCommand): Promise<MessageCommand> {
    return this.validateAspectOfMessageCommand(cmd, MessageCommandSchema, cmd);
  }

  private validateAspectOfMessageCommand(
    cmd: MessageCommand,
    schema: string | object | Validator,
    model: any,
  ): Promise<MessageCommand> {
    return new Promise((resolve, reject) => {
      this.toValidator(schema)
        .then(validator => {
          return validator
            .validate(model)
            .then(() => resolve(cmd))
            .catch(failure => reject(failure));
        })
        .catch(error => reject({ invalidFields: ['form'], missingFields: [] }));
    });
  }

  private toValidator(schema: string | object | Validator): Promise<Validator> {
    if (typeof schema === 'object' && (schema as Validator).validate) {
      return Promise.resolve(schema as Validator);
    } else {
      return this.factory.loadValidator(schema);
    }
  }

  private validateCaptcha(cmd: MessageCommand): Promise<MessageCommand> {
    return this.catpchaValidator
      ? this.validateAspectOfMessageCommand(cmd, this.catpchaValidator, cmd)
      : Promise.resolve(cmd);
  }

  private validateMessageModel(cmd: MessageCommand): Promise<MessageCommand> {
    return this.validateAspectOfMessageCommand(cmd, cmd.form, cmd.messageModel);
  }
}
