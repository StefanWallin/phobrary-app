const defaultState = {
  isLoaded: false,
  error: undefined,
};

export default function session(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
