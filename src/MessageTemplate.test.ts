import { MessageTemplate } from './MessageTemplate';

describe('MessageTemplate class', () => {
  const templates = new MessageTemplate();
  it('returns a filled template', () =>
    expect(templates.fill('test-template', { firstName: 'Ted', lastName: 'Smith' })).toBe('Hello Ted Smith!'));
  it('returns a template filled with different data', () =>
    expect(templates.fill('test-template', { firstName: 'Joe', lastName: 'Baker' })).toBe('Hello Joe Baker!'));
});
