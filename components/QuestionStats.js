import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { Button, Card } from 'react-native-elements'
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Loading1 from '../components/Loading1'

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

export default class QuestionStats extends React.Component {

  render() {

    return(

      <Query query={USER_QUESTION_QUERY} variables={{ testId: this.props.testId }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading1 />
              if (error) return <Text>{JSON.stringify(error)}</Text>

              const userQuestionStats = data.userQuestionStats

          return (

      <TouchableOpacity style={{margin:10}} onPress={() => this.props.navigation.navigate('UserQs',{testId:this.props.testId})} >
      <Card title='Your Questions' containerStyle={{width: '90%'}}>
      <Text style={styles.instructions}>Total Questions : {userQuestionStats.totalQuestions} </Text>
      <Text style={styles.instructions}>Total Answers: {userQuestionStats.answers} </Text>

      <Text style={styles.instructions}>Answers Correct: {userQuestionStats.totalCorrect} </Text>
      <Text style={styles.instructions}>Percent: {userQuestionStats.percentCorrect.toFixed(2)*100}% </Text>
      </Card >
      </TouchableOpacity>

      )
    }}
    </Query>


    )
  }
}

const styles = StyleSheet.create({
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
  }

});
