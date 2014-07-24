/*
 * test/client/e2e/test.js
 */

'use strict';

describe('Homepage', function () {
  beforeEach(function () {
    // URL is relative to baseUrl specified in config/test/protractor-e2e.conf.js
    browser.get('');
  });

  it('should show homepage', function () {

    // Should show the first name where the lock icon was
    expect(element(by.css('.awesomeo')).getText()).toContain('He sings and dances with a life size cut-out of:');
  });
});