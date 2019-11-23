export function createSession(code) {
  return { type: 'CREATE_SESSION_PENDING', code };
}
