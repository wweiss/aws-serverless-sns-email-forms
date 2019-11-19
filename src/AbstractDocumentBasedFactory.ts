import { DocumentFactory } from './DocumentFactory';

export abstract class AbstractDocumentBasedFactory {
  private documentFactory: DocumentFactory;

  constructor(documentFactory: DocumentFactory) {
    this.documentFactory = documentFactory;
  }

  protected loadDocument(documentName: string): Promise<string> {
    return this.documentFactory.loadDocument(documentName);
  }
}
