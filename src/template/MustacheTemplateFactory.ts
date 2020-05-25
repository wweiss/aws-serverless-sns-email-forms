import * as Mustache from 'mustache';
import { DocumentLoaderBasedFactory } from '../document';
import { NameValueModel } from '../NameValueModel';
import { MessageTemplate, TemplateFactory } from './TemplateFactory';

export class MustacheTemplateFactory extends DocumentLoaderBasedFactory implements TemplateFactory {
  public async loadMessageTemplate(name: string): Promise<MessageTemplate> {
    return new MustacheMessageTemplate(await this.loadDocument(`${name}.mustache.txt`));
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
