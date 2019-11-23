import AsyncStorage from '@react-native-community/async-storage';

export async function setAccessToken(token) {
  try {
    await AsyncStorage.setItem('session_access_token', token);
    return token;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAccessToken() {
  try {
    let value = await AsyncStorage.getItem('session_access_token');
    return value;
  } catch (error) {
    console.error(error);
    return null;
  }
}
