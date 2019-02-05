import React from 'react';
import { StyleSheet, Platform, Image, Text, Dimensions, View, ScrollView,TextInput,Alert} from 'react-native';
import { Button, Icon, Divider } from 'react-native-elements'

import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import QuestionChoices from '../components/QuestionChoices'
import ReviewChoice from '../components/ReviewChoice'

import ButtonColor from '../components/ButtonColor'
import Choice from '../components/Choice'
import Loading1 from '../components/Loading1'
import Error from '../components/Error'


const QUESTION_QUERY = gql`
  query CreateReviewQuery($questionId:ID!){
    question(id:$questionId){
      id
      question
      choices {
        id
        choice
        correct
      }
      panel{
        link
        id
      }
      test{
        id
        subject
        course{
          name
          institution{
            name
          }
        }
      }
    }
  }
`

const SEND_QUESTION_MUTATION = gql`
  mutation SendQuestion($testId: ID!, $questionId:ID! ){
    sendQuestion(testId:$testId, questionId:$questionId){
      question
      id
    }
  }
  `

export default class ReviewQuestion extends React.Component {

  static navigationOptions = {
    title: 'Review Question',
  };

  state ={
    isVisible: false,
    errorMessage:''
  }

  render() {

    const { navigation } = this.props;

    const {isVisible, errorMessage} = this.state

    const newQuestionId = navigation.getParam('newQuestionId', 'NO-ID')
    const oldQuestionId = navigation.getParam('oldQuestionId', 'NO-ID')
    const testId = navigation.getParam('testId', 'NO-ID')

    return (

      <ScrollView >
      <View style={styles.container}>
      <Query query={QUESTION_QUERY} variables={{ questionId: newQuestionId }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading1 />
              if (error) return <Error {...error} />

              const questionToRender = data.question

          return (
            <>
            <Text key={questionToRender.test.course.name} style={styles.welcome}>
            {questionToRender.test.course.name} - {questionToRender.test.course.institution.name}
            </Text>

            <Text key={questionToRender.test.subject} style={styles.welcome}>
            {questionToRender.test.subject} - {questionToRender.test.testNumber}
            </Text>

            <Image key={questionToRender.panel.link} source={{uri: questionToRender.panel.link }} style={styles.logo} />

            <View key={questionToRender.test.testNumber} style={styles.question}>
              <Text key={questionToRender.question} >
                {questionToRender.question}
              </Text>
            </View>

            {
              questionToRender.choices.map(choice =>
              <ReviewChoice key={choice.id} {...choice} />
              )
            }
            </>
          )
          }}
          </Query>

          <View>
          {isVisible &&
            <>
            <Text style={styles.messages}>Something is wrong!</Text>
            <Text style={styles.messages}>{errorMessage}</Text>
            </>

          }
          </View>

             <Mutation
                 mutation={SEND_QUESTION_MUTATION}
                 variables={{
                   questionId: newQuestionId,
                   testId: testId
                 }}
                 onCompleted={data => this._confirm(data)}
                 onError={error => this._error (error)}
               >
                 {mutation => (
                   <ButtonColor
                   title="Send Question"
                   backgroundcolor="#282828"
                   onpress={mutation}
                   />
                 )}
               </Mutation>

           <ButtonColor
           title="Edit"
           backgroundcolor="#282828"
           onpress={() => this.props.navigation.navigate('EditQuestion',{ questionId: newQuestionId })}
           />

          </View>
      </ScrollView>
    );
  }

  _error = async error => {
      //this.props.navigation.navigate('Error',{error: JSON.stringify(error)})
      //const errorMessage = error.graphQLErrors.map((err,i) => err.message)
      const errorMessage = error.graphQLErrors.map((err,i) => err.message)

      this.setState({ isVisible: true, errorMessage})
  }

  _confirm = (data) => {
    const { id,question } = data.sendQuestion
    const { navigation } = this.props;
    const oldQuestionId = navigation.getParam('oldQuestionId', 'NO-ID')

    this.props.navigation.navigate('AnswerQuestion',{ questionId: oldQuestionId })
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
    minHeight: 50,
    alignItems: 'center',
    backgroundColor:'white',
    width: 300,
    padding:10
  },
  question:{
    minHeight: 50,
    alignItems: 'center',
    backgroundColor:'white',
    width: 300,
    padding:10
  },
  logo: {
    height: 220,
    marginBottom: 15,
    marginTop: 15,
    width: 350,
  },
  choices:{
    flexDirection:"row",
    justifyContent: 'center',
    alignItems: 'center',
  },
  choicetext:{
    fontWeight:'bold',
    fontSize:18,
    color:'#484848'
  },
  question:{
    height: 80,
    width: 350,
    backgroundColor:'white',
    borderRadius: 10,
    margin:5,
    padding:10
  },
  messages: {
    padding:30,
    fontSize:18,
    textAlign:'center',
    color:'red'
  },
  input:{
    height: 40,
    width: 300,
    backgroundColor:'white',
    borderRadius: 10,
    margin:5,
    padding:10
  },
  answer:{
    height: 40,
    width: 100,
    backgroundColor:'white',
    borderRadius: 10,
    margin:5,
    padding:10
  }
});
