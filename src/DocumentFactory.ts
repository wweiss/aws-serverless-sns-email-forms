export interface DocumentFactory {
  loadDocument(name: string): Promise<string>;
}
