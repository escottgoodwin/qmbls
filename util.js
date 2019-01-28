import { AsyncStorage } from 'react-native';

let token;

const getToken = async () => {
  const token = await AsyncStorage.getItem('AUTH_TOKEN')
  return token
}

const getUserId = async () => {
  const userId = await AsyncStorage.getItem('USERID')
  return userId
}
