import AsyncStorage from '@react-native-community/async-storage';

ACCESS_TOKEN_STORAGE_KEY = 'device_id';

async function setAccessToken(token) {
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, uuid);
    return uuid;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function getAccessToken() {
  try {
    let value = await AsyncStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    return value;
  } catch (error) {
    console.error(error);
    return null;
  }
}
