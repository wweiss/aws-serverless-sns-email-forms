import { Logger, LoggerFactory } from '@codification/cutwater-logging';
import { Validator, ValidatorFactory } from '.';
import { MessageCommand, MessageCommandSchema } from '../MessageCommand';
import { GoogleReCaptchaValidator } from './GoogleReCaptchaValidator';

export class MessageValidator implements Validator {
  private readonly LOG: Logger = LoggerFactory.getLogger();

  public constructor(
    private factory: ValidatorFactory,
    private catpchaValidator: Validator = new GoogleReCaptchaValidator(),
  ) {}

  public async validate(cmd: MessageCommand): Promise<void> {
    await this.validateMessageCommand(cmd);
    await this.validateCaptcha(cmd);
    await this.validateMessageModel(cmd);
  }

  private async validateMessageCommand(cmd: MessageCommand): Promise<MessageCommand> {
    return await this.validateAspectOfMessageCommand(cmd, MessageCommandSchema, cmd);
  }

  private async validateAspectOfMessageCommand(
    cmd: MessageCommand,
    schema: string | object | Validator,
    model: any,
  ): Promise<MessageCommand> {
    let validator: Validator;
    try {
      validator = await this.toValidator(schema);
    } catch (err) {
      this.LOG.warn('Failed to validate message event: ', err.message);
      throw { invalidFields: ['form'], missingFields: [] };
    }
    await validator.validate(model);
    return cmd;
  }

  private async toValidator(schema: string | object | Validator): Promise<Validator> {
    if (typeof schema === 'object' && (schema as Validator).validate) {
      return schema as Validator;
    } else {
      return await this.factory.loadValidator(schema);
    }
  }

  private async validateCaptcha(cmd: MessageCommand): Promise<MessageCommand> {
    return this.catpchaValidator ? await this.validateAspectOfMessageCommand(cmd, this.catpchaValidator, cmd) : cmd;
  }

  private async validateMessageModel(cmd: MessageCommand): Promise<MessageCommand> {
    return await this.validateAspectOfMessageCommand(cmd, cmd.form, cmd.messageModel);
  }
}
