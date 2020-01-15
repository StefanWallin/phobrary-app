/* eslint-disable global-require, import/no-dynamic-require */
var mockserver = require('mockserver-node');
let _port = 3002;

const startMockServer = (port) => new Promise((resolve) => {
  console.log(`Starting mockServer for port ${port}`);
  _port = port;
  res = mockserver.start_mockserver({
      serverPort: port,
      verbose: true
  });
  resolve(mockserver);
});

const stopMockServer = (pid) => new Promise((resolve) => {
  console.log(`Stopping mockServer for port ${_port}`);
  mockserver.stop_mockserver({
      serverPort: _port
  });
  resolve(true);
});

export {
  startMockServer,
  stopMockServer
};
