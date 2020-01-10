var mockServer = require('mockserver-client'),
    mockServerClient = mockServer.mockServerClient

export default mockServerClient('localhost', 3001);
