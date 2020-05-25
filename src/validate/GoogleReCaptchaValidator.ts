import { Logger, LoggerFactory } from '@codification/cutwater-logging';
import * as GoogleRecaptcha from 'google-recaptcha';
import { AppConfig } from '../AppConfig';
import { MessageCommand } from '../MessageCommand';
import { ValidationFailure, Validator } from './ValidatorFactory';

const LOG: Logger = LoggerFactory.getLogger();

export class GoogleReCaptchaValidator implements Validator {
  public async validate(cmd: MessageCommand): Promise<void> {
    return await this.validateReCAPTCHA(cmd.token || '');
  }

  private async validateReCAPTCHA(token: string): Promise<void> {
    const rval: ValidationFailure = { missingFields: [], invalidFields: [] };

    if (!AppConfig.isReCaptchaEnabled) {
      return;
    } else if (token.length < 1) {
      rval.missingFields.push('token');
      throw rval;
    } else if (AppConfig.recaptchaSecretKey.length < 1) {
      throw new Error('ReCAPTCHA Secret Key is not set!');
    }

    const captcha = new GoogleRecaptcha({
      secret: AppConfig.recaptchaSecretKey,
    });

    return await new Promise((resolve, reject) => {
      captcha.verify({ response: token }, err => {
        if (err) {
          LOG.warn('ReCAPTCHA failed with error: ', err);
          rval.invalidFields.push('token');
          reject(rval);
        }
        resolve();
      });
    });
  }
}
