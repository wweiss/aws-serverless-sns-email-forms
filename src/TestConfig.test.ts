import { AJVValidatorFactory } from './AJVValidatorFactory';
import { DocumentLoader } from './DocumentLoader';
import { FileSystemDocumentLoader } from './FileSystemDocumentLoader';
import { MessageCommandSchema } from './MessageCommand';
import { MessageTransformer } from './MessageTransformer';
import { MustacheTemplateFactory } from './MustacheTemplateFactory';
import { TemplateFactory } from './TemplateFactory';
import { ValidatorFactory } from './ValidatorFactory';

export const DOCUMENT_LOADER: DocumentLoader = new FileSystemDocumentLoader('./test');
test('DOCUMENT_LOADER is available', () =>
  expect(DOCUMENT_LOADER.loadDocument('example.schema.json')).resolves.toBeTruthy());

export const TEMPLATE_FACTORY: TemplateFactory = new MustacheTemplateFactory(DOCUMENT_LOADER);
test('TEMPLATE_FACTORY is available', () =>
  expect(TEMPLATE_FACTORY.loadMessageTemplate('example')).resolves.toBeTruthy());

export const VALIDATOR_FACTORY: ValidatorFactory = new AJVValidatorFactory(DOCUMENT_LOADER);
test('VALIDATOR_FACTORY is available', () =>
  expect(VALIDATOR_FACTORY.loadValidator(MessageCommandSchema)).resolves.toBeTruthy());

export const MESSAGE_TRANSFORMER: MessageTransformer = new MessageTransformer(TEMPLATE_FACTORY);
test('MESSAGE_TRANSFORMER is available', () => expect(MESSAGE_TRANSFORMER).toBeTruthy());
