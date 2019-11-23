import AsyncStorage from '@react-native-community/async-storage';

export async function destroySession(serverUuid) {
  try {
    await AsyncStorage.removeItem(asyncStorageKey(serverUuid));
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function storeSession(values) {
  try {
    const { serverUuid } = values;
    const value = JSON.stringify(values);
    console.log("storeSession: ", value, asyncStorageKey(serverUuid));
    await AsyncStorage.setItem(asyncStorageKey(serverUuid), value);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function retreiveSession(serverUuid) {
  console.log("retreiveSession: ", serverUuid, asyncStorageKey(serverUuid));
  try {
    let value = await AsyncStorage.getItem(asyncStorageKey(serverUuid));
    let object = JSON.parse(value);
    console.log("Retreived:", object);
    return object;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function asyncStorageKey(serverUuid) {
  return `session_for_server.${serverUuid}`;
}
