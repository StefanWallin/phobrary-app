import { setAccessToken, getAccessToken } from '~storage/accessTokenStore';

const defaultState = {
  isLoaded: false,
  isLoading: false,
  error: undefined,
  accessToken: undefined,
  secret: undefined
};

export default function session(state = defaultState, action) {
  switch (action.type) {
    case 'LOAD_SESSION_SUCCESS':
      console.log(action);
      return {
        ...state,
      }
    case 'CREATE_SESSION_SUCCESS':
      const accessToken = action.result.access_token;
      setAccessToken(accessToken)
      return {
        ...state,
        error: undefined,
        isLoaded: true,
        isLoading: false,
        accessToken,
      };
    case 'CREATE_SESSION_ERROR':
      return {
        ...state,
        error: action.error,
        isLoaded: true,
        isLoading: false,
        accessToken: undefined,
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
      return {
        ...state,
        error: undefined,
        isLoaded: false,
        isLoading: false,
        accessToken: undefined,
      };
    case 'CREATE_SESSION_SUCCESS':
    default:
      return state;
  }
}
