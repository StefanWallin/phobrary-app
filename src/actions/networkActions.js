export function foundServer(server) {
  return { type: 'FOUND_SERVER', server };
}
export function testServerCompatibility(server) {
  return { type: 'TEST_SERVER_COMPATIBILITY', server };
}
