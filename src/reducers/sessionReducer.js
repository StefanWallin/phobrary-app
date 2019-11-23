import { destroySession, storeSession, retreiveSession } from '~storage/sessionStore';

const defaultState = {
  isLoaded: false,
  isLoading: false,
  error: undefined,
  accessToken: undefined,
  secret: undefined,
  serverUuid: undefined,
};

export default function session(state = defaultState, action) {
  switch (action.type) {
    case 'LOAD_SESSION_PENDING':
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
      };
    case 'LOAD_SESSION_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        accessToken: action.result.accessToken,
        secret: action.result.serverSecret,
        serverUuid: action.result.serverUuid,
      };
    case 'CREATE_SESSION_SUCCESS':
      const { access_token: accessToken, serverUuid, secret: serverSecret } = action.result;
      storeSession({ serverUuid, serverSecret, accessToken });
      return {
        ...state,
        error: undefined,
        isLoaded: true,
        isLoading: false,
        accessToken,
        secret: serverSecret,
        serverUuid,
      };
    case 'LOAD_SESSION_ERROR':
    case 'CREATE_SESSION_ERROR':
      return {
        ...defaultState,
        error: action.error,
      };
    case 'CREATE_SESSION_PENDING':
      return {
        ...state,
        error: undefined,
        isLoaded: false,
        isLoading: true,
        accessToken: undefined,
      };
    case 'DELETE_SESSION':
      // destroySession(state.serverUuid);
      return {
        ...defaultState,
      };
    default:
      return state;
  }
}
