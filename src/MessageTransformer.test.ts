import { AppConfig } from './AppConfig';
import { MessageCommand } from './MessageCommand';
import { MessageTransformer } from './MessageTransformer';

const transformer: MessageTransformer = new MessageTransformer(new AppConfig());
const validMsgCommand: MessageCommand = {
  form: 'example',
  messageModel: {
    name: 'Clark Kent',
    email: 'glasses@manofsteel.io',
    subject: 'Get the Lead Out!',
    message: 'Just a reminder to get to work.',
  },
};
const alternateMsgCommand: MessageCommand = {
  form: 'example',
  messageModel: {
    name: 'Lex Luthor',
    email: 'lex@luthorcorp.net',
    subject: 'Line it with Lead',
    message: 'I have an idea...',
  },
};

describe('MessageTransformer class', () => {
  it('can return a string from a valid command', () => {
    return expect(transformer.transform(validMsgCommand)).resolves.toBeTruthy();
  });
  it('can correctly transform a valid command', () => {
    return expect(transformer.transform(validMsgCommand)).resolves.toBe(
      'Clark Kent<glasses@manofsteel.io>; ' +
        'Subject: Get the Lead Out!; ' +
        'Message: Just a reminder to get to work.',
    );
  });
  it('can correctly transform an alternate valid command', () => {
    return expect(transformer.transform(alternateMsgCommand)).resolves.toBe(
      'Lex Luthor<lex@luthorcorp.net>; ' + 'Subject: Line it with Lead; ' + 'Message: I have an idea...',
    );
  });
});
