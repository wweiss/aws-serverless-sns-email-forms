import { DOCUMENT_LOADER } from '../TestConfig.test';
import { MustacheTemplateFactory } from './MustacheTemplateFactory';
import { MessageTemplate, TemplateFactory } from './TemplateFactory';

const factory: TemplateFactory = new MustacheTemplateFactory(DOCUMENT_LOADER);
let template: MessageTemplate;

beforeAll(() => {
  return factory.loadMessageTemplate('test-template').then(result => (template = result));
});

describe('MustacheTemplateFactory', () => {
  it('can load a mustache template', () => {
    return expect(factory.loadMessageTemplate('test-template')).resolves.toBeTruthy();
  });
  it('returns rejection error when the template is missing', () => {
    return expect(factory.loadMessageTemplate('missing-template')).rejects.toBeTruthy();
  });
});

describe('MessageTemplate', () => {
  it('can fill the template using a model', () =>
    expect(template.fill({ firstName: 'Bob', lastName: 'Smith' })).toBe('Hello Bob Smith!'));
  it('can fill the template using a different model', () =>
    expect(template.fill({ firstName: 'Joe', lastName: 'Boon' })).toBe('Hello Joe Boon!'));
  it('can fill the template using a partial model', () =>
    expect(template.fill({ lastName: 'Boon' })).toBe('Hello  Boon!'));
});
