import { AppConfig } from './AppConfig';

describe('AppConfig class defaults', () => {
  const config: AppConfig = new AppConfig();
  it('by default returns an empty ReCAPTCHA secret key', () => expect(config.recaptchaSecretKey).toBe(''));
  it('by default enables ReCAPTCHA', () => expect(config.isRecaptchaEnabled).toBeTruthy());
});
