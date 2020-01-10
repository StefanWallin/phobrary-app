/* eslint-disable max-len */
/* global device, element, by, waitFor */

import {
  cancelStatusOkStub,
  stubStatusOk,
  stubSessionCreateOk,
  performLogout,
  performLogin,
} from '~e2e/helper';

describe('Authentication', () => {
  it('is possible to login', async (done) => {


    await stubStatusOk();
    await device.reloadReactNative(); // Workaround until I continuously try to post status because MDNS announce and connect happens before mock server is ready

    await waitFor(element(by.id('serverDiscoveryScreen'))).toBeVisible().withTimeout(8000);
    await waitFor(element(by.id('serverButton-Test').withAncestor(by.id('serverDiscoveryScreen')))).toBeVisible().withTimeout(200);
    await element(by.id('serverButton-Test').withAncestor(by.id('serverDiscoveryScreen'))).tap();

    await waitFor(element(by.id('createSessionScreen'))).toBeVisible().withTimeout(200);

    await expect(element(by.id('authErrorHeader').withAncestor(by.id('createSessionScreen')))).toBeVisible();
    await expect(element(by.id('authErrorMessage').withAncestor(by.id('createSessionScreen')))).toBeVisible();
    await expect(element(by.id('authInstruction').withAncestor(by.id('createSessionScreen')))).toBeVisible();
    await expect(element(by.id('authCodeInput').withAncestor(by.id('createSessionScreen')))).toBeVisible();

    await stubSessionCreateOk();
    await element(by.id('authCodeInput').withAncestor(by.id('createSessionScreen'))).tap();
    await element(by.id('authCodeInput').withAncestor(by.id('createSessionScreen'))).typeText('lolcode');
    await element(by.id('authCodeInput').withAncestor(by.id('createSessionScreen'))).tapReturnKey();

    await waitFor(element(by.id('uploadScreen'))).toBeVisible().withTimeout(2000);
    await waitFor(element(by.id('signOutButton').withAncestor(by.id('uploadScreen')))).toBeVisible().withTimeout(200);

    await expect(element(by.id('signOutButton').withAncestor(by.id('uploadScreen')))).toBeVisible();

    await performLogout(); // Workaround since we can't clear asyncStorage yet.
    done();
  });

  it('is possible to logout', async (done) => {
    await performLogin();
    await waitFor(element(by.id('signOutButton').withAncestor(by.id('uploadScreen')))).toBeVisible().withTimeout(200);
    await cancelStatusOkStub();
    await performLogout();
    await waitFor(element(by.id('introduction-paragraph').withAncestor(by.id('serverDiscoveryScreen')))).toBeVisible().withTimeout(200);
    done();
  });
});
