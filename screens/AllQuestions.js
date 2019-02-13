import React from 'react';
import { StyleSheet, Platform, Image, FlatList, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { Button, Card } from 'react-native-elements'

import ButtonColor from '../components/ButtonColor'
import QAList from '../components/QAList'
import Error from '../components/Error'

import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import Loading1 from '../components/Loading1'

const TEST_QUESTIONS_QUERY = gql`
query TestQuestionsQuery($testId:ID!){
  test(id:$testId){
    id
    subject
    testNumber
    testDate
    course{
      id
      name
    }
    questions{
      id
      question
    }
  }
}
`


export default class AllQuestions extends React.Component {

  static navigationOptions = {
    title: 'All Questions',
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
              if (error) return <Error {...error}/>

              const testToRender = data.test

          return (
        <View style={styles.container}>
        <ScrollView >
          <Text style={styles.welcome}>
            {testToRender.course.name} - {testToRender.course.courseNumber}
          </Text>

          <Text style={styles.welcome}>
            {testToRender.subject} - {testToRender.testNumber}
          </Text>

          <ButtonColor
          title="Answer Random Question"
          backgroundcolor="#003366"
          onpress={() => this.answerRandom(testToRender.questions)}
          />

          <FlatList
          data={testToRender.questions}
          renderItem={
            ({ item, index }) => (
              <TouchableOpacity style={styles.choice}
              onPress={() => this.props.navigation.navigate('AnswerQuestion',{questionId:item.id })}>
               <Text style={{fontSize:14,marginBottom:3}} >
               {item.question}
               </Text>

              </TouchableOpacity>

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
