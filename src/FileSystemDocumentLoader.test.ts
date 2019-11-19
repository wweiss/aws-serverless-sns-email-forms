import { DocumentLoader } from './DocumentLoader';
import { FileSystemDocumentLoader } from './FileSystemDocumentLoader';

describe('FileSystemDocumentLoader class', () => {
  const loader: DocumentLoader = new FileSystemDocumentLoader('./test');
  it('can load a document', () => {
    return expect(loader.loadDocument('test-template.mustache.txt')).resolves.toBeTruthy();
  });
});
