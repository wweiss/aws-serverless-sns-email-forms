import { FileDocumentFactory } from './FileDocumentFactory';
import { MessageTemplate } from './MessageTemplate';
import { MustacheTemplateFactory } from './MustacheTemplateFactory';
import { TemplateFactory } from './TemplateFactory';

const factory: TemplateFactory = new MustacheTemplateFactory(new FileDocumentFactory('./test'));
let template: MessageTemplate;

beforeAll(() => {
  return factory.loadMessageTemplate('test-template.txt').then(result => (template = result));
});

describe('MustacheTemplateFactory', () => {
  it('can load a mustache template', () =>
    factory.loadMessageTemplate('test-template.txt').then(result => expect(result).toBeTruthy()));
  it('returns rejection error when the template is missing', () =>
    factory
      .loadMessageTemplate('missing-template.txt')
      .then()
      .catch(err => expect(err).toBeTruthy()));
});

describe('MessageTemplate', () => {
  it('can fill the template using a model', () =>
    expect(template.fill({ firstName: 'Bob', lastName: 'Smith' })).toBe('Hello Bob Smith!'));
  it('can fill the template using a different model', () =>
    expect(template.fill({ firstName: 'Joe', lastName: 'Boon' })).toBe('Hello Joe Boon!'));
  it('can fill the template using a partial model', () =>
    expect(template.fill({ lastName: 'Boon' })).toBe('Hello  Boon!'));
});
