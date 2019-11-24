import { destroySession, storeSession, retreiveSession } from '~storage/sessionStore';

const defaultState = {
  activity: false,
  activitySources: [],
  compatibleServers: {},
  error: undefined,
  foundServers: {},
  selectedServer: undefined,
  uri: undefined
};

export default function network(state = defaultState, action) {
  switch (action.type) {
    case 'LOAD_SESSION_SUCCESS':
    case 'SELECTED_SERVER':
      const selectedServer = {
        ...action.server,
        uri: `${action.server.preferredHost}:${action.server.port}`,
      };
      return {
        ...state,
        selectedServer,
      };
    case 'DELETE_SESSION':
      destroySession(state.selectedServer.serverUuid);
      return { ...state };

    case 'FOUND_SERVER':
      let foundServers = {...state.foundServers};
      foundServers[action.server.fullName] = action.server;
      return {
        ...state,
        foundServers,
      };
    case 'COMPATIBLE_SERVER':
      let compatibleServers = {...state.compatibleServers};
      compatibleServers[action.server.fullName] = action.server;
      return {
        ...state,
        compatibleServers,
      }
    case 'NETWORKUSAGE_START':
      return {
        ...state,
        activitySources: [...state.activitySources, action.activityName],
      }
    case 'NETWORKUSAGE_STOP':
      return {
        ...state,
        activitySources: state.activitySources.filter((element) => { element !== action.activityName }),
      }
    default:
      return state;
  }
}
