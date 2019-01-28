import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, Text, View } from 'react-native';
import { Button } from 'react-native-elements'

const DashboardHeader = (props) =>
  <View style={styles.container}>
    <Image source={require('../assets/RNFirebase.png')} style={[styles.logo]}/>
    <Text style={styles.welcome}>
      Welcome {props.name}
    </Text>
  </View>


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4f1fe',
    height:600
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});

DashboardHeader.propTypes = {
  name: PropTypes.string.isRequired,
};

export default DashboardHeader
