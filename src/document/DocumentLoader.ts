export interface DocumentLoader {
  loadDocument(name: string): Promise<string>;
}
