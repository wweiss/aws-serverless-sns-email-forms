import { MessageCommand } from './MessageCommand';
import { MessageTemplate } from './MessageTemplate';
import { TemplateFactory } from './TemplateFactory';
import { TemplateModel } from './TemplateModel';

export class MessageTransformer {
  public constructor(private templateFactory: TemplateFactory) {}

  public transform(cmd: MessageCommand): Promise<string> {
    return this.templateFactory
      .loadMessageTemplate(cmd.form)
      .then(template => this.fillTemplate(template, { from: cmd.from, subject: cmd.subject, ...cmd.messageModel }));
  }

  private fillTemplate(template: MessageTemplate, model: TemplateModel): string {
    return template.fill(model);
  }
}
