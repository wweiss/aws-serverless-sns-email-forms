import * as Mustache from 'mustache';
import { DocumentLoaderBasedFactory } from './DocumentLoaderBasedFactory';
import { MessageTemplate } from './MessageTemplate';
import { TemplateFactory } from './TemplateFactory';
import { TemplateModel } from './TemplateModel';

export class MustacheTemplateFactory extends DocumentLoaderBasedFactory implements TemplateFactory {
  public loadMessageTemplate(name: string): Promise<MessageTemplate> {
    return this.loadDocument(`${name}.mustache.txt`).then(document => {
      return new MustacheMessageTemplate(document);
    });
  }
}

// tslint:disable-next-line: max-classes-per-file
class MustacheMessageTemplate implements MessageTemplate {
  private template: string;

  constructor(template: string) {
    this.template = template;
    Mustache.parse(template);
  }

  public fill(model: TemplateModel): string {
    return Mustache.render(this.template, model);
  }
}
