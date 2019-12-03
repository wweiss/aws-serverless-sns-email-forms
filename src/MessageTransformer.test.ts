import { MessageCommand } from './MessageCommand';
import { MessageTransformer } from './MessageTransformer';
import { TEMPLATE_FACTORY } from './TestConfig.test';

const transformer: MessageTransformer = new MessageTransformer(TEMPLATE_FACTORY);
const validMsgCommand: MessageCommand = {
  form: 'example',
  from: 'glasses@manofsteel.io',
  subject: 'Get the Lead Out!',
  messageModel: {
    name: 'Clark Kent',
    message: 'Just a reminder to get to work.',
  },
};
const alternateMsgCommand: MessageCommand = {
  form: 'example',
  from: 'lex@luthorcorp.net',
  subject: 'Line it with Lead',
  messageModel: {
    name: 'Lex Luthor',
    message: 'I have an idea...',
  },
};

describe('MessageTransformer class', () => {
  it('can return a string from a valid command', () => {
    return expect(transformer.transform(validMsgCommand)).resolves.toBeTruthy();
  });
  it('can correctly transform a valid command', () => {
    return expect(transformer.transform(validMsgCommand)).resolves.toBe(
      'Clark Kent says: Just a reminder to get to work.',
    );
  });
  it('can correctly transform an alternate valid command', () => {
    return expect(transformer.transform(alternateMsgCommand)).resolves.toBe('Lex Luthor says: I have an idea...');
  });
});
