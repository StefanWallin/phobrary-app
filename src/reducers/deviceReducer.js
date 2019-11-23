const defaultState = {
  deviceId: null,
};

export default function device(state = defaultState, action) {
  switch (action.type) {
    case 'DEVICE_LOADED':
      return {
        ...state,
        deviceId: action.deviceId,
      };
    default:
      return state;
  }
}
