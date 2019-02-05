import '@babel/polyfill'
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { setContext } from 'apollo-link-context';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { AsyncStorage } from "react-native"

import Welcome from './screens/Welcome';
import SignIn from './screens/SignIn';
import SignOut from './screens/SignOut';
import NotAuthorized from './screens/NotAuthorized';
import TeacherDashboard from './screens/TeacherDashboard';
import StudentDashboard from './screens/StudentDashboard';
import CourseDashboard from './screens/CourseDashboard';
import TestDashboard from './screens/TestDashboard';
import CreateQuestion from './screens/CreateQuestion';
import EditQuestion from './screens/EditQuestion';
import ReviewQuestion from './screens/ReviewQuestion';
import AnswerQuestion from './screens/AnswerQuestion';
import QuestionAnswered from './screens/QuestionAnswered'


import Loading from './components/Loading'
import Error from './screens/Error'
import CreateQuestionError from './screens/CreateQuestionError'


const token1 = 'asdf'
const getToken = async () => {
  const token = await AsyncStorage.getItem('AUTH_TOKEN')
  return token
}

const httpLink = createHttpLink({
  uri: 'https://quandria-be.herokuapp.com/',
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
});

const wsLink = new WebSocketLink({
  uri: 'wss://quandria-be.herokuapp.com/',
  options: {
    reconnect: true,
    connectionParams: {
        authorization: token1 ? `Bearer ${token1}` : "",
    },
  }
});

const authLink = setContext( async (_, { headers }) => {
  const token = await getToken()
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const fullHttpLink = authLink.concat(httpLink)

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  fullHttpLink,
);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

const AppNavigator = createStackNavigator(
  {
    Welcome: Welcome,
    SignIn: SignIn,
    SignOut: SignOut,
    NotAuthorized: NotAuthorized,
    Loading:  Loading,
    TeacherDashboard: TeacherDashboard,
    StudentDashboard: StudentDashboard,
    CourseDashboard: CourseDashboard,
    TestDashboard: TestDashboard,
    CreateQuestion: CreateQuestion,
    EditQuestion: EditQuestion,
    ReviewQuestion: ReviewQuestion,
    AnswerQuestion: AnswerQuestion,
    QuestionAnswered: QuestionAnswered,
    Error:Error,
    CreateQuestionError:CreateQuestionError 
  },
  {
    initialRouteName: "Welcome"
  }
);

const Container = createAppContainer(AppNavigator);

const App = () => (
  <ApolloProvider client={client}>
    <Container />
  </ApolloProvider>
);

export default App
