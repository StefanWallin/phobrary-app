import AsyncStorage from '@react-native-community/async-storage';

export async function destroySession(serverUuid) {
  try {
    await AsyncStorage.removeItem(asyncStorageKey(serverUuid));
  } catch (error) {
    return null;
  }
}

export async function storeSession(values) {
  try {
    const { serverUuid } = values;
    const value = JSON.stringify(values);
    await AsyncStorage.setItem(asyncStorageKey(serverUuid), value);
  } catch (error) {
    return null;
  }
}

export async function retreiveSession(serverUuid) {
  try {
    let value = await AsyncStorage.getItem(asyncStorageKey(serverUuid));
    let object = JSON.parse(value);
    return object;
  } catch (error) {
    return null;
  }
}

function asyncStorageKey(serverUuid) {
  return `session_for_server.${serverUuid}`;
}
