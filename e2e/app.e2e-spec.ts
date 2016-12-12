import { AngularCrudExampleWithPouchDBPage } from './app.po';

describe('angular-crud-example-with-pouch-db App', function() {
  let page: AngularCrudExampleWithPouchDBPage;

  beforeEach(() => {
    page = new AngularCrudExampleWithPouchDBPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
