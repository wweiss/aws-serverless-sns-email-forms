import { DocumentLoader, FileSystemDocumentLoader } from './document';
import { Message, MessageFactory, MessageTransformer, ValidatingMessageFactory } from './message';
import { MessageCommandSchema } from './MessageCommand';
import { MessageSender } from './send';
import { MustacheTemplateFactory, TemplateFactory } from './template';
import { AJVValidatorFactory, MessageValidator, Validator, ValidatorFactory } from './validate';

export const DOCUMENT_LOADER: DocumentLoader = new FileSystemDocumentLoader('./test');
test('DOCUMENT_LOADER is available', () =>
  expect(DOCUMENT_LOADER.loadDocument('example.schema.json')).resolves.toBeTruthy());

export const TEMPLATE_FACTORY: TemplateFactory = new MustacheTemplateFactory(DOCUMENT_LOADER);
test('TEMPLATE_FACTORY is available', () =>
  expect(TEMPLATE_FACTORY.loadMessageTemplate('example')).resolves.toBeTruthy());

export const VALIDATOR_FACTORY: ValidatorFactory = new AJVValidatorFactory(DOCUMENT_LOADER);
test('VALIDATOR_FACTORY is available', () =>
  expect(VALIDATOR_FACTORY.loadValidator(MessageCommandSchema)).resolves.toBeTruthy());

export const MESSAGE_VALIDATOR: Validator = new MessageValidator(VALIDATOR_FACTORY);
test('MESSAGE_VALIDATOR is available', () => expect(MESSAGE_VALIDATOR).toBeTruthy());

export const MESSAGE_TRANSFORMER: MessageTransformer = new MessageTransformer(TEMPLATE_FACTORY);
test('MESSAGE_TRANSFORMER is available', () => expect(MESSAGE_TRANSFORMER).toBeTruthy());

export const MESSAGE_FACTORY: MessageFactory = new ValidatingMessageFactory(MESSAGE_VALIDATOR, MESSAGE_TRANSFORMER);
test('MESSAGE_FACTORY is available', () => expect(MESSAGE_FACTORY).toBeTruthy());

export class MockMessageSender implements MessageSender {
  public messages: Message[] = [];

  public send(message: Message): Promise<void> {
    this.messages.push(message);
    return Promise.resolve();
  }
}

export const MESSAGE_SENDER: MessageSender = new MockMessageSender();
test('MESSAGE_SENDER is available', () => expect(MESSAGE_SENDER).toBeTruthy());
