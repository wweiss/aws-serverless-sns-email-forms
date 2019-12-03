import { Config } from '@codification/cutwater-core';

export class AppConfig {
  public readonly templateBucketName: string = Config.get('TEMPLATE_BUCKET_NAME');
  public readonly snsTopicARN: string = Config.get('SNS_TOPIC_ARN');

  public readonly recaptchaSecretKey: string = Config.get('RECAPTCHA_SECRET_KEY');
  public readonly isRecaptchaEnabled: boolean = Config.get('DISABLE_RECAPTCHA', 'false').toLocaleLowerCase() !== 'true';
}
