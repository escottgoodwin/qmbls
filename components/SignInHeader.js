import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements'

const SignInHeader = (props) =>


<View style={styles.container}>
  <Image source={require('../assets/quandria_welcome.png')} style={[styles.logo]}/>

  <Text style={styles.welcome}>
    {props.title}
  </Text>
  </View>

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#e4f1fe',
      height:600
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    logo: {
      height: 120,
      marginBottom: 16,
      marginTop: 32,
    },
  });

  SignInHeader.propTypes = {
    title: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
  };

export default SignInHeader
