/* eslint-disable global-require, import/no-dynamic-require, import/no-extraneous-dependencies */
/* global device */
import { startMockServer,     stopMockServer } from 'e2e/mock-server';
import { startMockMDNSServer, stopMockMDNSServer } from 'e2e/mock-mdns-server';

const adapter = require('detox/runners/jest/adapter');
const detox = require('detox');
const config = require('../package.json').detox;

// Set the default test timeout of 120s
jest.setTimeout(120000);
// eslint-disable-next-line no-undef
jasmine.getEnv().addReporter(adapter);

let mockServerPid, mockMDNSServerPid;
const serverPort = 3001;

beforeAll(async () => {
  mockServerPid = await startMockServer(serverPort);
  mockMDNSServerPid = await startMockMDNSServer(serverPort);
  await detox.init(config);
});

beforeEach(async () => {
  await adapter.beforeEach();
  await device.clearKeychain();
  await device.launchApp({ newInstance: true });
});

afterAll(async (done) => {
  await adapter.afterAll();
  await stopMockServer(mockServerPid);
  await stopMockMDNSServer(mockMDNSServerPid);
  await detox.cleanup();
  done();
});
