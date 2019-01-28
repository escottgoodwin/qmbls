import React from 'react';
import { StyleSheet,KeyboardAvoidingView, Platform, Image, Text, View, ScrollView,TextInput,Alert} from 'react-native';
import Expo from "expo";
import { Facebook } from 'expo';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import SignInHeader from '../components/SignInHeader'
import ButtonColor from '../components/ButtonColor'

export default class SignUp extends React.Component {

  static navigationOptions = {
    title: 'Sign Up',
  };

  constructor (props) {
     super(props)
     this.state = {
       email: '',
       password: '',
       errorMessage: '',
       name:'',
       institution_id:'',
     }
  }

  render() {
    return (
      <KeyboardAvoidingView
      style={styles.container}
      behavior="padding" >

        <View style={styles.container}>

          <SignInHeader
          title='Quandria Sign Up'
          errorMessage={this.state.errorMessage}
          />

          <TextInput placeholder='Email' style={{height: 40,width: 300, backgroundColor:'white',borderRadius: 25,borderColor: 'darkgrey',margin:5,padding:10}}
          onChangeText={(email) => {
            this.setState({ email })}}
          value={this.state.email}
          autoCapitalize='none'
          keyboardType='email-address'
          />

           <TextInput placeholder='Password' style={styles.signinput}
           onChangeText={(password) => {
             this.setState({ password })}}
           value={this.state.password}
           autoCapitalize='none'
          />

          <TextInput placeholder='name' style={styles.signinput}
          onChangeText={(name) => {
            this.setState({ name })}}
          value={this.state.name}
          />

           <TextInput placeholder='Institution Id' style={styles.signinput}
           onChangeText={(institution_id) => {
             this.setState({ institution_id })}}
           value={this.state.institution_id}
          />

          <ButtonColor
          title="Sign Up with Email"
          backgroundcolor="#003366"
          onpress={this.signUpWithEmail}
          />

        </View>

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4f1fe',
  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 32,
    width: 120,
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
  },
  signinput: {
    height: 40,
    width: 300,
    backgroundColor:'white',
    borderRadius: 25,
    borderColor: 'darkgrey',
    margin:5,
    padding:10}
});
