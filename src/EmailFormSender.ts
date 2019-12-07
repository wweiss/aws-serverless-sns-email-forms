import { Logger, LoggerFactory } from '@codification/cutwater-logging';
import { MessageFactory } from './message';
import { MessageCommand } from './MessageCommand';
import { MessageSender } from './send';

const LOG: Logger = LoggerFactory.getLogger();

export class EmailFormSender {
  public constructor(private messageFactory: MessageFactory, private messageSender: MessageSender) {}

  public send(messageCommand: MessageCommand): Promise<void> {
    return this.messageFactory.createMessage(messageCommand).then(message => {
      this.messageSender.send(message).catch(err => {
        LOG.error(`Encountered unexpected error while sending message: `, err);
        throw err;
      });
    });
  }
}
