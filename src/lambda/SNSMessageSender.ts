import { SNS } from 'aws-sdk';
import { PublishInput } from 'aws-sdk/clients/sns';
import { AppConfig } from '../AppConfig';
import { Message } from '../Message';
import { MessageSender } from '../MessageSender';

const sns = new SNS();

export class SNSMessageSender implements MessageSender {
  constructor(private config: AppConfig) {}

  public send(message: Message, callback: (err?: any) => void): void {
    const params: PublishInput = {
      Message: message.body,
      Subject: message.subject,
      TopicArn: this.config.snsTopicARN,
    };
    sns.publish(params, snsErr => {
      callback(snsErr);
    });
  }
}
