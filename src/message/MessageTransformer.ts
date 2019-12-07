import { MessageCommand } from '../MessageCommand';
import { NameValueModel } from '../NameValueModel';
import { MessageTemplate, TemplateFactory } from '../template';

export class MessageTransformer {
  public constructor(private templateFactory: TemplateFactory) {}

  public transform(cmd: MessageCommand): Promise<string> {
    return this.templateFactory
      .loadMessageTemplate(cmd.form)
      .then(template => this.fillTemplate(template, { from: cmd.from, subject: cmd.subject, ...cmd.messageModel }));
  }

  private fillTemplate(template: MessageTemplate, model: NameValueModel): string {
    return template.fill(model);
  }
}
