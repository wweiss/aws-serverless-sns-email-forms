import { AJVValidatorFactory } from './AJVValidatorFactory';
import { AppConfig } from './AppConfig';
import { FileSystemDocumentLoader } from './FileSystemDocumentLoader';
import { MustacheTemplateFactory } from './MustacheTemplateFactory';
import { RecaptchaValidator } from './RecaptchaValidator';

describe('AppConfig class defaults', () => {
  const config: AppConfig = new AppConfig();
  it('by default returns an empty ReCAPTCHA secret key', () => expect(config.recaptchaSecretKey).toBe(''));
  it('by default enables ReCAPTCHA', () => expect(config.isRecaptchaEnabled).toBeTruthy());
  it('by default returns a FileSystemDocumentLoader', () =>
    expect(config.documentLoader).toBeInstanceOf(FileSystemDocumentLoader));
  it('by default returns a MustacheTemplateFactory', () =>
    expect(config.templateFactory).toBeInstanceOf(MustacheTemplateFactory));
  it('by default returns a AJVValidatorFactory', () =>
    expect(config.validatorFactory).toBeInstanceOf(AJVValidatorFactory));
  it('by default returns a ReCAPTCHA Validator', () =>
    expect(config.recaptchaValidator).toBeInstanceOf(RecaptchaValidator));
});
