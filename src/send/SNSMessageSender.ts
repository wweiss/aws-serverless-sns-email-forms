import { SNS } from 'aws-sdk';
import { PublishInput } from 'aws-sdk/clients/sns';
import { AppConfig } from '../AppConfig';
import { Message } from '../message';
import { MessageSender } from './MessageSender';

const sns = new SNS();

export class SNSMessageSender implements MessageSender {
  public send(message: Message): Promise<void> {
    const params: PublishInput = {
      Message: message.body,
      Subject: message.subject,
      TopicArn: AppConfig.snsTopicARN,
    };
    return new Promise((resolve, reject) => {
      sns.publish(params, snsErr => {
        if (snsErr) {
          reject(snsErr);
        } else {
          resolve();
        }
      });
    });
  }
}
