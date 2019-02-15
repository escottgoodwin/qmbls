import React from 'react';
import { StyleSheet, Platform, FlatList, Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { Button, Card, Icon } from 'react-native-elements'

import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import ButtonColor from '../components/ButtonColor'
import AnsweredChoice from '../components/AnsweredChoice'
import Loading1 from '../components/Loading1'
import Error from '../components/Error'
import QAList from '../components/QAList'
import TestHeader from '../components/TestHeader'


const ANSWERED_QUESTION_QUERY = gql`
query AnswerQuery($answerId:ID!){
  answer(id:$answerId){
    id
    answer{
      id
      choice
      correct
    }
    question{
      id
      question
      choices{
        id
        choice
        correct
      }
      test{
        id
        subject
        testNumber
        course{
          id
          name
          institution{
            id
            name
          }
        }
      }
    }
  }
}
`

export default class QuestionAnswered extends React.Component {

  static navigationOptions = {
    title: 'Questions Answered',
  };



  render() {
    const { navigation } = this.props;

    const answerId = navigation.getParam('answerId', 'NO-ID')

    return (
      <ScrollView >
      <View style={styles.container}>
      <Query query={ANSWERED_QUESTION_QUERY} variables={{ answerId: answerId }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading1 />
              if (error) return <Error {...error}/>

              const answerToRender = data.answer

          return (
            <>
            <TestHeader testId={answerToRender.question.test.id}/>

            {answerToRender.answer.correct ?
              <>
              <Text style={styles.welcome}>
              You got it right!
              </Text>
              <View style={styles.choice}>
              <Icon
                name='check-square'
                type='font-awesome'
                color='#4AC948'
                 />
              <Text style={styles.welcome}>
              {answerToRender.answer.choice}
              </Text>
              </View>
              </>
              :
              <>
              <Text style={styles.welcome}>
              You got it wrong.
              </Text>
              <View style={styles.choice}>
              <Icon
                name='times-circle'
                type='font-awesome'
                color='#ff0000'
                 />
              <Text style={styles.welcome}>
              {answerToRender.answer.choice}
              </Text>
              </View>
              </>
            }

            <Text style={styles.question}>
              {answerToRender.question.question}
            </Text>

            <FlatList
            data={answerToRender.question.choices}
            renderItem={
              ({ item, index }) => (
                <AnsweredChoice key={item.id} {...item} />
              )
            }
            keyExtractor={item => item.id}
          />

           <ButtonColor
           title="Challenge Answer"
           backgroundcolor="#282828"
           onpress={() => this.props.navigation.navigate('ChallengeDashboard',{ answerId: answerToRender.id,questionId:answerToRender.question.id })}
           />

          <ButtonColor
          title="Test Dashboard"
          backgroundcolor="#282828"
          onpress={() => this.props.navigation.navigate('TestDashboard',{ testId:answerToRender.question.test.id })}
          />
          </>
        )
        }}
        </Query>

          </View>
      </ScrollView>
    )
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
    flexDirection:"row",
    alignItems: 'center',
    backgroundColor:'white',
    padding:10,
    margin:15,
    borderRadius:5,
    minWidth:'85%'
  },
  question:{
    fontSize: 20,
    backgroundColor:'white',
    padding:10,
    margin:10,
    borderRadius:5,
    minWidth:'85%'
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
