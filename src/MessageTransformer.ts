import { AppConfig } from './AppConfig';
import { MessageCommand } from './MessageCommand';
import { MessageTemplate } from './MessageTemplate';
import { TemplateModel } from './TemplateModel';

export class MessageTransformer {
  private config: AppConfig;

  public constructor(config: AppConfig) {
    this.config = config;
  }

  public transform(cmd: MessageCommand): Promise<string> {
    return this.config.templateFactory
      .loadMessageTemplate(cmd.form)
      .then(template => this.fillTemplate(template, cmd.messageModel));
  }

  private fillTemplate(template: MessageTemplate, model: TemplateModel): string {
    return template.fill(model);
  }
}
