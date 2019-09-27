const defaultState = {
  online: false,
  activity: false,
  error: undefined,
};

export default function network(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
