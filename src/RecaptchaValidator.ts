import { Logger, LoggerFactory } from '@codification/cutwater-logging';
import * as GoogleRecaptcha from 'google-recaptcha';
import { AppConfig } from './AppConfig';
import { MessageCommand } from './MessageCommand';

const LOG: Logger = LoggerFactory.getLogger();

export class RecaptchaValidator {
  public constructor(private config: AppConfig) {}

  public validate(cmd: MessageCommand): Promise<void> {
    let rval: Promise<void> = Promise.resolve();
    if (this.config.isRecaptchaEnabled && !cmd.token) {
      rval = Promise.reject(new Error('Missing required ReCAPTCHA token.'));
    } else if (this.config.isRecaptchaEnabled && cmd.token) {
      rval = this.validateReCAPTCHA(cmd.token);
    }
    return rval;
  }

  private validateReCAPTCHA(token: string): Promise<void> {
    const captcha = new GoogleRecaptcha({
      secret: this.config.recaptchaSecretKey,
    });
    return new Promise((resolve, reject) => {
      captcha.verify({ response: token }, err => {
        if (err) {
          LOG.warn('ReCAPTCHA failed with error: ', err);
          reject(new Error('Failed reCAPTCHA.'));
        } else {
          resolve();
        }
      });
    });
  }
}
