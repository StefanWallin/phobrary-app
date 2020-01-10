/* eslint-disable global-require, import/no-dynamic-require */
const { exec } = require('child_process');

const startMockMDNSServer = (port) => new Promise((resolve) => {
  console.log(`Starting mock MDNS server for port ${port}`);
  let out = '';
  out = exec(`MOCK_SERVER_PORT=${port} bundle exec e2e/mock-mdns-server/mdns-advertiser.rb`);
  resolve(out.pid);
});

const stopMockMDNSServer = (pid) => new Promise((resolve) => {
  console.log(`Stopping mock MDNS server with pid ${pid}`);
  let out = '';
  out = exec(`kill -9 ${pid}`);
  // out.stdout.on('data', console.log);
  resolve(true);
});

export {
  startMockMDNSServer,
  stopMockMDNSServer
};
