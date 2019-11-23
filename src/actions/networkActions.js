export function selectedServer(server) {
  return { type: 'SELECTED_SERVER', server };
}
export function foundServer(server) {
  return { type: 'FOUND_SERVER', server };
}
export function testServerCompatibility(server) {
  return { type: 'TEST_SERVER_COMPATIBILITY', server };
}
