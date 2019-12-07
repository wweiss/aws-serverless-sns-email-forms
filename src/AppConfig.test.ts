import { Config } from '@codification/cutwater-core';
import { AppConfig } from './AppConfig';

beforeEach(() => {
  Config.put('RECAPTCHA_ENABLED', 'false');
});

describe('AppConfig class', () => {
  it('can return the correct default value for RECAPTCHA_ENABLED', () =>
    expect(AppConfig.isReCaptchaEnabled).toBeFalsy());

  it('can return dynamically modified value for RECAPTCHA_ENABLED', () => {
    Config.put('RECAPTCHA_ENABLED', 'true');
    expect(AppConfig.isReCaptchaEnabled).toBeTruthy();
  });
});
