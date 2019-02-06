import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TextInput, Alert} from 'react-native';
import { Button } from 'react-native-elements'

import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import ButtonColor from '../components/ButtonColor'
import Choice from '../components/Choice'
import Loading1 from '../components/Loading1'

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
        course
        {
          name
          institution{
            name
          }
        }
      }
    }
  }
}
`

const CREATE_CHALLENGE_MUTATION = gql`
  mutation CreateChallengeMutation($challenge:String!,
    $answerId:ID!{
    addChallenge(challenge:$challenge,
    answerId:$answerId){
      id
    }
  }
  `

export default class CreateQuestion extends React.Component {

  static navigationOptions = {
    title: 'Create Question',
  };

  state = {
    challenge:'',
    isVisible: false,
    errorMessage:''
  };

  render(){
    const { navigation } = this.props;

    const answerId = navigation.getParam('answerId', 'NO-ID')

    const {
    challenge,
    isVisible,
    errorMessage
    } = this.state

    return(
      <ScrollView contentContainerStyle={styles.container}>
      <Query query={ANSWERED_QUESTION_QUERY} variables={{ answerId: answerId }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading1 />
              if (error) return <Text>{JSON.stringify(error)}</Text>

              const answerToRender = data.answer

          return (
            <>
            <Text style={styles.welcome}>
            {answerToRender.question.test.course.name} - {answerToRender.question.test.course.institution.name}
            </Text>

            <Text style={styles.welcome}>
            {answerToRender.question.test.subject} - {answerToRender.question.test.testNumber}
            </Text>

            <TextInput
              placeholder='Challenge'
              style={styles.question}
              onChangeText={(text) => this.setState({challenge: text})}
              multiline={true}
              numberOfLines={4}
              value={question}
             />

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

            {
              answerToRender.question.choices.map(choice =>

                <AnsweredChoice key={choice.id} {...choice} />

            )
          }

             <View>
             {isVisible &&
               <>
               <Text style={styles.messages}>Something is wrong!</Text>
               <Text style={styles.messages}>{errorMessage}</Text>
               </>

             }
             </View>

             <Mutation
                 mutation={CREATE_CHALLENGE_MUTATION}
                 variables={{
                   challenge: this.state.challenge,
                   answerId: answerId,
                 }}
                 onCompleted={data => this._confirm(data)}
                 onError={error => this._error (error)}
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
             title="Cancel"
             backgroundcolor="#282828"
             onpress={() => this.props.navigation.navigate('StudentDashboard')}
             />
             </>
           )
         }}
         </Query>
      </ScrollView>
    )
  }

  _error = async error => {
      //this.props.navigation.navigate('Error',{error: JSON.stringify(error)})
      //const errorMessage = error.graphQLErrors.map((err,i) => err.message)
      const errorMessage = error.graphQLErrors.map((err,i) => err.message)

      this.setState({ isVisible: true, errorMessage})
  }

  _confirm = (data) => {
    const { id } = data.addChallenge

    this.props.navigation.navigate('ChallengeDashboard',{ challengeId: id })
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4f1fe',
    minHeight:800
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
  },
  messages: {
    padding:30,
    fontSize:18,
    textAlign:'center',
    color:'red'
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
    width: 250,
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
  answer:{
    height: 40,
    width: 100,
    backgroundColor:'white',
    borderRadius: 10,
    margin:5,
    padding:10
  }
});
