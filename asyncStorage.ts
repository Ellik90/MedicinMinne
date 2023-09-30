import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from './Data';
import { NotificationModal } from './Contexts/NotificationContext';

export const storeNotificationData = async (notification:NotificationModal) => {
  try {
    const jsonValue = JSON.stringify(notification);
    await AsyncStorage.setItem('notification', jsonValue);
    console.log("sparat:", jsonValue)
  } catch (e) {
    // saving error
  }
};

export const getNotificationData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('notification');
    console.log("hämtar:", jsonValue)
    return jsonValue != null ? JSON.parse(jsonValue) as NotificationModal : null;
  } catch (e) {
    // error reading value
  }
};

export const storeData = async (user:User) => {
    try {
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem('user', jsonValue);
      console.log("sparat:", jsonValue)
    } catch (e) {
      // saving error
    }
  };

  export const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      console.log("hämtar:", jsonValue)
      return jsonValue != null ? JSON.parse(jsonValue) as User : null;
    } catch (e) {
      // error reading value
    }
  };