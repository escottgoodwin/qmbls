import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView} from 'react-native';
import { Button } from 'react-native-elements'

import ButtonColor from '../components/ButtonColor'

export default class Welcome extends React.Component {

  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    const { navigation } = this.props;
    const authMsg = navigation.getParam('authMsg', 'NO-ID');

    return (
      <ScrollView contentContainerStyle={styles.container}>

          <Image source={require('../assets/quandria_welcome.png')} style={[styles.logo]}/>
          <Text style={styles.welcome}>
            You are not authorized for this page.
          </Text>

          <Text style={styles.welcome}>
            {authMsg} 
          </Text>

          <ButtonColor
          title="Sign In"
          backgroundcolor="#003366"
          onpress={() => this.props.navigation.navigate("SignIn")}
          />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e4f1fe',
  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 32,

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
