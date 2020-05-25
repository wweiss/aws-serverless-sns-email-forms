import { DocumentLoader } from './DocumentLoader';

export abstract class DocumentLoaderBasedFactory {
  constructor(private documentLoader: DocumentLoader) {}

  protected async loadDocument(documentName: string): Promise<string> {
    try {
      return await this.documentLoader.loadDocument(documentName);
    } catch (err) {
      throw new Error(`Failed to read document[${documentName}] with error: ${err.message}`);
    }
  }
}
