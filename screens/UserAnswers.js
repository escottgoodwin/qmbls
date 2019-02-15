import React from 'react';
import { StyleSheet, Platform, Image, FlatList, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { Button, Divider } from 'react-native-elements'

import ButtonColor from '../components/ButtonColor'
import QAList from '../components/QAList'
import TestHeader from '../components/TestHeader'

import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import AnswersLoader from '../components/AnswersLoader'
import Error from '../components/Error'

const TEST_QUESTIONS_QUERY = gql`
query UserAnswers($testId:ID!){
  userAnswers(testId:$testId){
    id
    answerCorrect
    answer{
      id
      choice
    }
    question{
      id
      question
      choices{
        id
        choice
        correct
      }
    }
  }
}
`

const USER_ANSWERED_QUERY = gql`
query UserAnsweredStats($testId:ID!){
  userAnsweredStats(testId:$testId){
    total
    totalCorrect
    percentCorrect
  }
}
`

export default class UserAnswer extends React.Component {

  static navigationOptions = {
    title: 'Your Answers',
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
              if (loading) return <AnswersLoader />
              if (error) return <Error {...error}/>

              const answersToRender = data.userAnswers

          return (
        <View style={styles.container}>
        <ScrollView >

          <TestHeader testId={testId} />

          <Text style={styles.welcome}>Your Answers</Text>

          <Query query={USER_ANSWERED_QUERY} variables={{ testId: testId }}>
                {({ loading, error, data }) => {
                  if (loading) return <Loading1 />
                  if (error) return <Text>{JSON.stringify(error)}</Text>

                  const userAnsweredStats = data.userAnsweredStats

              return (

          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',margin:10,padding:10,borderRadius:5,backgroundColor:'white'}}>
          <Text style={styles.instructions}>Total: {userAnsweredStats.total} </Text>
          <Text style={styles.instructions}>Correct: {userAnsweredStats.totalCorrect} </Text>
          <Text style={styles.instructions}>{userAnsweredStats.percentCorrect.toFixed(2)*100}% </Text>
          </View >

          )
        }}
        </Query>

          <FlatList
          data={answersToRender}
          renderItem={
            ({ item, index }) => (
              <View style={styles.choice} >
               <Text style={{fontSize:14,margin:10}}>{item.question.question} </Text>

               <Divider style={{ backgroundColor: '#D3D3D3' }} />

               {item.answerCorrect ?
                 <Text style={styles.correct}>{item.answer.choice}</Text>
                 :
                 <Text style={styles.incorrect}>{item.answer.choice}</Text>}
               </View>
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
    backgroundColor:'white',
    padding:10,
    margin:10,
    borderRadius:5
  },
  correct:{
    fontSize:14,
    color:'green',
    margin:10
  },
  incorrect:{
    fontSize:14,
    color:'red',
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
    fontSize:18,
    borderRadius:5
  },
});
