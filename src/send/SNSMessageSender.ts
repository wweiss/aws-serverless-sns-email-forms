import { SNS } from 'aws-sdk';
import { AppConfig } from '../AppConfig';
import { Message } from '../message';
import { MessageSender } from './MessageSender';

const sns = new SNS();

export class SNSMessageSender implements MessageSender {
  public async send(message: Message): Promise<void> {
    await sns
      .publish({
        Message: message.body,
        Subject: message.subject,
        TopicArn: AppConfig.snsTopicARN,
      })
      .promise();
  }
}
