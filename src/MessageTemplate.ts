export interface TemplateModel {
  [key: string]: string;
}

export class MessageTemplate {
  public fill(templateName: string, templateValues: TemplateModel): string {
    return 'Hello Ted Smith!';
  }
}
