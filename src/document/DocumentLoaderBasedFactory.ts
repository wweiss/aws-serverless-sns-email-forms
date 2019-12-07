import { DocumentLoader } from './DocumentLoader';

export abstract class DocumentLoaderBasedFactory {
  constructor(private documentLoader: DocumentLoader) {}

  protected loadDocument(documentName: string): Promise<string> {
    return this.documentLoader.loadDocument(documentName);
  }
}
