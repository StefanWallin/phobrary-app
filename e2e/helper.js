import mockServerClient from '~e2e/mock-server/mockserver-client';

const stubStatusOk = async () => {
  await mockServerClient.mockAnyResponse({
    httpRequest: { method: "GET", path: "/api/status/v1/", },
    httpResponse: { statusCode: 200, body: '{ "status": "ok" }' }
  });
};

const cancelStatusOkStub = async () => {
  await mockServerClient.clear({ path: "/api/status/v1/" });
};

const stubSessionCreateOk = async () => {
  await mockServerClient.mockAnyResponse({
    httpRequest: { method: "POST", path: "/api/sessions/v1/", },
    httpResponse: { statusCode: 201, body: '{ "status": "ok", "access_token": "at", "secret": "s" }' },
    times: { remainingTimes: 1, unlimited: false },
  });
};

const performLogout = async () => {
  await element(by.id('signOutButton').withAncestor(by.id('uploadScreen'))).tap();
};

const performLogin = async () => {
    await stubStatusOk();
    await stubSessionCreateOk();

    await device.reloadReactNative(); // Workaround until I continuously try to post status because MDNS announce and connect happens before mock server is ready

    await waitFor(element(by.id('serverDiscoveryScreen'))).toBeVisible().withTimeout(8000);
    await waitFor(element(by.id('serverButton-Test').withAncestor(by.id('serverDiscoveryScreen')))).toBeVisible().withTimeout(2000);
    await element(by.id('serverButton-Test').withAncestor(by.id('serverDiscoveryScreen'))).tap();
    await waitFor(element(by.id('createSessionScreen'))).toBeVisible().withTimeout(200);
    await element(by.id('authCodeInput').withAncestor(by.id('createSessionScreen'))).tap();
    await element(by.id('authCodeInput').withAncestor(by.id('createSessionScreen'))).typeText('lolcode');
    await element(by.id('authCodeInput').withAncestor(by.id('createSessionScreen'))).tapReturnKey();

    await waitFor(element(by.id('uploadScreen'))).toBeVisible().withTimeout(2000);
};

export {
  stubStatusOk,
  cancelStatusOkStub,
  stubSessionCreateOk,
  performLogout,
  performLogin,
};
