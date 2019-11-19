import { Config } from '@codification/cutwater-core';
import { AJVValidatorFactory } from './AJVValidatorFactory';
import { DocumentLoader } from './DocumentLoader';
import { FileSystemDocumentLoader } from './FileSystemDocumentLoader';
import { MustacheTemplateFactory } from './MustacheTemplateFactory';
import { RecaptchaValidator } from './RecaptchaValidator';
import { TemplateFactory } from './TemplateFactory';
import { ValidatorFactory } from './ValidatorFactory';

export class AppConfig {
  public readonly templateBucketName: string = Config.get('TEMPLATE_BUCKET_NAME');

  public readonly recaptchaSecretKey: string = Config.get('RECAPTCHA_SECRET_KEY');
  public readonly isRecaptchaEnabled: boolean = Config.get('DISABLE_RECAPTCHA', 'false').toLocaleLowerCase() !== 'true';

  public documentLoader: DocumentLoader = new FileSystemDocumentLoader('./test');
  public templateFactory: TemplateFactory = new MustacheTemplateFactory(this);
  public validatorFactory: ValidatorFactory = new AJVValidatorFactory(this);
  public recaptchaValidator: RecaptchaValidator = new RecaptchaValidator(this);
}
