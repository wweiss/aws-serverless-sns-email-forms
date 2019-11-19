import { DocumentFactory } from './DocumentFactory';
import { FileDocumentFactory } from './FileDocumentFactory';

describe('FileDocumentFactory', () => {
  const factory: DocumentFactory = new FileDocumentFactory('./test');
  it('can load a document', () => {
    return factory.loadDocument('test-template.txt').then(result => expect(result).toBeTruthy());
  });
});
