import * as Mustache from 'mustache';
import { DocumentLoaderBasedFactory } from '../document';
import { NameValueModel } from '../NameValueModel';
import { MessageTemplate, TemplateFactory } from './TemplateFactory';

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

  public fill(model: NameValueModel): string {
    return Mustache.render(this.template, model);
  }
}
