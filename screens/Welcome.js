import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView} from 'react-native';
import { Button } from 'react-native-elements'

import ButtonColor from '../components/ButtonColor'

export default class Welcome extends React.Component {

  static navigationOptions = {
    title: 'Welcome',
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>

          <Image source={require('../assets/quandria_welcome.png')} style={[styles.logo]}/>
          <Text style={styles.welcome}>
            Welcome to Quandria
          </Text>

          <Text style={styles.welcome}>
            Quiz each other to prepare for tests.
          </Text>

          <Text style={styles.welcome}>
            Study without studying. Without cramming.
          </Text>

          <Text style={styles.welcome}>
            No more cramming.
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
