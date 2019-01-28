import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView,TextInput,Alert} from 'react-native';
import { Button } from 'react-native-elements'

import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import QuestionChoices from '../components/QuestionChoices'
import ButtonColor from '../components/ButtonColor'
import Choice from '../components/Choice'

QUESTION_QUERY = gql`
  query CreateReviewQuery($questionId:ID!){
    question(id:$questionId){
      id
      question
      choices {
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
        }
      }
    }
  }
`

SEND_QUESTION_MUTATION = gql`

`

export default class ReviewQuestion extends React.Component {

  static navigationOptions = {
    title: 'Review Question',
  };

  render() {

    const { navigation } = this.props;

    const newQuestionId = navigation.getParam('newQuestionId', 'NO-ID')
    const oldQuestionId = navigation.getParam('oldQuestionId', 'NO-ID')


    return (

      <ScrollView >
      <View style={styles.container}>
      <Query query={CREATE_QUESTION_QUERY} variables={{ questionId: questionId }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading1 />
              if (error) return <Text>{JSON.stringify(error)}</Text>

              const questionToRender = data.question

          return (
            <>
            <Text style={styles.welcome}>
            {questionToRender.test.course.name} - {questionToRender.test.course.institution.name}
            </Text>

            <Text style={styles.welcome}>
            {questionToRender.test.subject} - {questionToRender.test.testNumber}
            </Text>

            <Image key={questionToRender.sentPanel.link} source={{uri: questionToRender.sentPanel.link }} style={styles.logo} />

            {
              questionToRender.choices.map(choice =>
                <Text style={styles.welcome}>
                {choice.choice} - {choice.correct ? 'Correct' : '' }
                </Text>
              )
            }
            </>
            )

          }}
          </Query>

             <Mutation
                 mutation={SEND_QUESTION_MUTATION}
                 variables={{
                   questionId: newQuestionId,
                 }}
                 onCompleted={data => this._confirm(data)}
               >
                 {mutation => (
                   <ButtonColor
                   title="Review"
                   backgroundcolor="#282828"
                   onpress={mutation}
                   />
                 )}
               </Mutation>

           <ButtonColor
           title="Edit"
           backgroundcolor="#282828"
           onpress={() => this.props.navigation.navigate('EditQuestion',{ questionId:questionId })}
           />

          <ButtonColor
          title="Cancel"
          backgroundcolor="#282828"
          onpress={() => this.props.navigation.navigate('StudentDashboard')}
          />
          </View>
      </ScrollView>
    );
  }
  _confirm = (data) => {
    const { id } = data.addQuestion
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
