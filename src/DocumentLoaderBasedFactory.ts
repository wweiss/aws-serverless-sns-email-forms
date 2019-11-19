import { AppConfig } from './AppConfig';

export abstract class DocumentLoaderBasedFactory {
  protected config: AppConfig;

  constructor(config: AppConfig) {
    this.config = config;
  }

  protected loadDocument(documentName: string): Promise<string> {
    return this.config.documentLoader.loadDocument(documentName);
  }
}
