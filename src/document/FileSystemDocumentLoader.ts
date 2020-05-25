import * as fs from 'fs';
import * as path from 'path';
import { DocumentLoader } from './DocumentLoader';

export class FileSystemDocumentLoader implements DocumentLoader {
  private documentDirectory: string;

  constructor(documentDirectory: string) {
    this.documentDirectory = documentDirectory;
  }

  public loadDocument(name: string): Promise<string> {
    const templatePath: string = path.resolve(this.documentDirectory, name);
    return new Promise((resolve, reject) => {
      fs.readFile(templatePath, { encoding: 'utf8' }, (err, document) => {
        if (err) {
          reject(err);
        } else {
          resolve(document);
        }
      });
    });
  }
}
