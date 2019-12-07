import { Logger, LoggerFactory } from '@codification/cutwater-logging';
import { APIGatewayProxyEvent, Context, ProxyCallback } from 'aws-lambda';
import { DocumentLoader, S3DocumentLoader } from '../document';
import { EmailFormSender } from '../EmailFormSender';
import { MessageFactory, MessageTransformer, ValidatingMessageFactory } from '../message';
import { MessageCommand } from '../MessageCommand';
import { MessageSender, SNSMessageSender } from '../send';
import { MustacheTemplateFactory } from '../template';
import { AJVValidatorFactory, isValidationFailure, MessageValidator, Validator } from '../validate';

const LOG: Logger = LoggerFactory.getLogger();

const documentLoader: DocumentLoader = new S3DocumentLoader();
const templateFactory = new MustacheTemplateFactory(documentLoader);
const validator: Validator = new MessageValidator(new AJVValidatorFactory(documentLoader));
const messageFactory: MessageFactory = new ValidatingMessageFactory(validator, new MessageTransformer(templateFactory));
const messageSender: MessageSender = new SNSMessageSender();
const sender: EmailFormSender = new EmailFormSender(messageFactory, messageSender);

exports.handler = (event: APIGatewayProxyEvent, context: Context, callback: ProxyCallback) => {
  const msgCommand: MessageCommand = JSON.parse(event.body || '');

  sender
    .send(msgCommand)
    .then(() => {
      LOG.debug('Email sent from: ', msgCommand.from);
      callback(null, { statusCode: 200, body: '' });
    })
    .catch(err => {
      if (isValidationFailure(err)) {
        LOG.debug('Message failed validation: ', err);
        callback(null, {
          statusCode: 400,
          body: JSON.stringify(err),
        });
      } else {
        LOG.error('Error sending email: ', err);
        callback(null, {
          statusCode: 500,
          body: JSON.stringify({
            errors: { internal: 'Server error delivering message.' },
          }),
        });
      }
    });
};
