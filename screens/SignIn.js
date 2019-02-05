import React from 'react';
import { AsyncStorage, KeyboardAvoidingView, StyleSheet, Platform, Image, Text, View, ScrollView,TextInput,Alert } from 'react-native';
import { Facebook } from 'expo';
import {SecureStore} from 'expo'
import { Button, Input, Icon, Overlay } from 'react-native-elements'
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import ButtonColor from '../components/ButtonColor'
import SignInHeader from '../components/SignInHeader'

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user{
        id
        firstName
        lastName
        online
        role
        teacherInstitutions {
          id
          name
        }
        studentInstitutions {
          id
          name
        }
        institution{
          name
          id
        }
      }
    }
  }
`

const setToken = (newToken) => {
  const token = AsyncStorage.setItem('AUTH_TOKEN', newToken)
  return token
};

const setUser = (userid) => {
  const user1 = AsyncStorage.setItem('USERID', userid)
  return user1
};

export default class SignIn extends React.Component {

  static navigationOptions = {
    title: 'Sign In',
  };

     state = {
       email: '',
       password: '',
       errorMessage: '',
       isVisible:false
     }



  render() {

    const { email, password, errorMessage, isVisible } = this.state

    return (
      <KeyboardAvoidingView
      style={styles.container}
      behavior="padding" >



      <SignInHeader
      title='Quandria Sign In'
      />

      <View>
      {isVisible &&
        <>
        <Text style={styles.messages}>Something is wrong!</Text>
        <Text style={styles.messages}>{errorMessage}</Text>
        </>

      }
      </View>

    <TextInput
     placeholder='Email'
     style={styles.button}
     onChangeText={(text) => this.setState({email:text})}
     value={email}
     autoCapitalize='none'
     keyboardType='email-address'
     />

     <TextInput
      placeholder='Password'
      style={styles.button}
      onChangeText={(text) => this.setState({password:text})}
      value={password}
      autoCapitalize='none'
      />

      <Mutation
          mutation={LOGIN_MUTATION}
          variables={{ email:email, password:password }}
          onCompleted={data => this._confirm(data)}
          onError={error => this._error (error)}
        >
          {mutation => (
            <ButtonColor
            title="Login with Email"
            backgroundcolor="#003366"
            onpress={mutation}
            />
          )}
        </Mutation>


      </KeyboardAvoidingView>
    );
  }

  _error = async error => {
      //this.props.navigation.navigate('Error',{error: JSON.stringify(error)})
      //const errorMessage = error.graphQLErrors.map((err,i) => err.message)
      const errorMessage = error.graphQLErrors.map((err,i) => err.message)

      this.setState({ isVisible: true, errorMessage})
  }

  _confirm = async data => {
    const { token, user } = data.login
    const userid = user.id

    setToken(token)
    setUser(userid)

    if (user.role === 'STUDENT') {
      this.props.navigation.navigate('StudentDashboard')
    } else {
      authMsg = 'If you are a teacher or adminstrator, please login with your teacher app.'
      this.props.navigation.navigate('NotAuthorized',{authMsg:authMsg})
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#e4f1fe',
  },
  button:
  {
    height: 50,
    width: 300,
    backgroundColor:'white',
    borderRadius: 15,
    margin:10,
    paddingLeft:20
  },
  messages: {
    padding:30,
    fontSize:18,
    textAlign:'center',
    color:'red'
  },
});
