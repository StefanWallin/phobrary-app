import AsyncStorage from '@react-native-community/async-storage';
import uuidv4 from 'uuid/v4';

DEVICE_ID_STORAGE_KEY = 'device_id';

async function generateDeviceId() {
  const uuid = uuidv4();
  try {
    await AsyncStorage.setItem(DEVICE_ID_STORAGE_KEY, uuid);
    return uuid;
  } catch (error) { return null; }
}

export default async function getDeviceID() {
  try {
    let value = await AsyncStorage.getItem(DEVICE_ID_STORAGE_KEY);
    if (value === null) {
      value = await generateDeviceId();
    }
    return value;
  } catch (error) { return null; }
}
