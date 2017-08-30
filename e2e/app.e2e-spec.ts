import { TypingTestProjectPage } from './app.po';

describe('typing-test-project App', () => {
  let page: TypingTestProjectPage;

  beforeEach(() => {
    page = new TypingTestProjectPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
