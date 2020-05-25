import { Logger, LoggerFactory } from '@codification/cutwater-logging';
import { Message, MessageFactory } from './message';
import { MessageCommand } from './MessageCommand';
import { MessageSender } from './send';

const LOG: Logger = LoggerFactory.getLogger();

export class EmailFormSender {
  public constructor(private messageFactory: MessageFactory, private messageSender: MessageSender) {}

  public async send(messageCommand: MessageCommand): Promise<void> {
    const message: Message = await this.messageFactory.createMessage(messageCommand);
    try {
      await this.messageSender.send(message);
    } catch (err) {
      LOG.error(`Encountered unexpected error while sending message: `, err);
      throw err;
    }
  }
}
