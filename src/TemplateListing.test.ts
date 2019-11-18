import { TemplateListing } from './TemplateListing';

describe('TemplateListing class', () => {
  const templateList = new TemplateListing();
  it('returns the test template', () => expect(templateList.load('test-template')).toBeTruthy());
});
