import React from 'react';
import { StyleSheet, Platform, Image, FlatList, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { Button, Divider } from 'react-native-elements'

import ButtonColor from '../components/ButtonColor'
import QAList from '../components/QAList'
import TestHeader from '../components/TestHeader'
import UserQuestionItem from '../components/UserQuestionItem'


import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import Loading1 from '../components/Loading1'

const TEST_QUESTIONS_QUERY = gql`
query UserQuestions($testId:ID!){
  userQuestions(testId:$testId){
    id
    question
    choices{
      id
      choice
      correct
    }
    questionAnswers{
      id
      answerCorrect
      answer{
        id
        choice
        correct
      }
    }
  }
}
`

const USER_QUESTION_QUERY = gql`
query UserQuestionStats($testId:ID!){
  userQuestionStats(testId:$testId){
    totalQuestions
    totalCorrect
    percentCorrect
    answers
  }
}
`

export default class UserQs extends React.Component {

  static navigationOptions = {
    title: 'Your Questions',
  }

  state = {
    challenge:'',
    isVisible: false,
    errorMessage:''
  }

answerRandom = (questions) =>  {
    this.props.navigation.navigate("AnswerQuestion")
  }

  render() {

    const testId = this.props.navigation.getParam('testId', 'NO-ID')

    return (

      <Query query={TEST_QUESTIONS_QUERY} variables={{ testId: testId }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading1 />
              if (error) return <Text>{JSON.stringify(error)}</Text>

              const userQuestions = data.userQuestions

          return (
        <View style={styles.container}>
        <ScrollView >

          <TestHeader testId={testId} />

          <Text style={styles.welcome}>Your Questions</Text>

          <Query query={USER_QUESTION_QUERY} variables={{ testId: testId }}>
                {({ loading, error, data }) => {
                  if (loading) return <Loading1 />
                  if (error) return <Text>{JSON.stringify(error)}</Text>

                  const userQuestionStats = data.userQuestionStats

              return (
          <>
          <View style={{flex:1,flexDirection:'row',width: 300,justifyContent:'space-between',margin:10,padding:10,backgroundColor:'white'}}>

          <Text style={styles.instructions}>Questions : {userQuestionStats.totalQuestions} </Text>
          <Text style={styles.instructions}>Answers: {userQuestionStats.answers} </Text>
          </View >

          <View style={{flex:1,flexDirection:'row',width: 300,justifyContent:'space-between',margin:10,padding:10,backgroundColor:'white'}}>
          <Text style={styles.instructions}>Correct: {userQuestionStats.totalCorrect} </Text>
          <Text style={styles.instructions}>Percent: {userQuestionStats.percentCorrect.toFixed(2)*100}% </Text>

          </View >
          </>
          )
        }}
        </Query>


          <FlatList
          data={userQuestions}
          renderItem={
            ({ item, index }) => (
              <UserQuestionItem {...item} />
            )
          }
          keyExtractor={item => item.id}
        />

          <ButtonColor
          title="Test Dashboard"
          backgroundcolor="#282828"
          onpress={() => this.props.navigation.navigate('TestDashboard',{ testId:testId })}
          />
          </ScrollView >
        </View>
      )
    }}
    </Query>
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
  choice:{
    minHeight: 50,
    backgroundColor:'white',
    width: 300,
    padding:10,
    margin:10
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
    fontSize:18
  },
});
