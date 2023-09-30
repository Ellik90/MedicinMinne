import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from './Data';

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