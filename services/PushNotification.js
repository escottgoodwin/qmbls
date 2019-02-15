import { Permissions, Notifications } from 'expo';

import gql from 'graphql-tag'
import { execute, makePromise } from 'apollo-link'
import HttpLink from 'apollo-link-http'

const STORE_TOKEN = gql`
mutation StoreToken($pushToken:String!){
  updateUser(pushToken:$pushToken){
    id
    pushToken
  }
}
`

async function registerForPushNotificationsAsync() {

  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let pushToken = await Notifications.getExpoPushTokenAsync();
  const token = await AsyncStorage.getItem('AUTH_TOKEN')

  const uri = 'https://quandria-be.herokuapp.com/'
  const link = new HttpLink({ uri })
  // POST the token to your backend server from where you can retrieve it to send push notifications.
  const operation = {
    mutation: STORE_TOKEN,
    variables: { pushToken: pushToken },
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  }

  makePromise(execute(link, operation))
    .then(resp => {
        return resp.updateUser.pushToken
        this.props.navigation.navigate('StudentDashboard')
    })
    .catch(error => console.log(`received error ${error}`))
}
