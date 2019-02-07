import React from 'react';
import { StyleSheet, Platform, FlatList, Image, Text, View, ScrollView,TextInput,Alert} from 'react-native';
import { Button,Card } from 'react-native-elements'

import DisputeQuestion from '../components/DisputeQuestion'
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import ButtonColor from '../components/ButtonColor'
import Loading1 from '../components/Loading1'
import QAList from '../components/QAList'
import ChallengeRow from '../components/ChallengeRow'

const ADD_CHALLENGE_MESSAGE_MUTATION = gql`
mutation AddChallengeMessage($challengeId: ID!, $challengeMessage: String!) {
  addChallengeMessage(challengeMessage: $challengeMessage,
  challengeId: $challengeId){
    addedBy{
      firstName
    }
    challengeMessage
    challenge{
      answer{
        answer{
          choice
        }
      }
    }
  }
}
`

const CHALLENGE_QUESTION_QUERY = gql`
query AnswerQuestionQuery($questionId:ID!){
  question(id:$questionId){
    id
    question
    choices {
      id
      choice
      correct
    }
  challenges{
    id
    challenge
    addedDate
    addedBy{
      firstName
      lastName
    }
  }
    test{
      id
      subject
      testNumber
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

const CREATE_CHALLENGE_MUTATION = gql`
  mutation CreateChallenge($answerId:ID!,$challenge:String!){
    addChallenge(challenge:$challenge,answerId:$answerId){
      id
    }
  }
`

const CHALLENGE_MESSAGE_QUERY = gql`
    query ChallengeQuery($challengeId:ID!){
      challenge(id:$challengeId){
         id
      challenge
      question{
        question
        addedDate
        addedBy{
          firstName
          lastName
        }
      }
      addedBy{
        firstName
        lastName
      }
      addedDate
      }
    challengeMessages{
      challengeMessages{
        challengeMessage
        addedDate
        addedBy{
          firstName
          lastName
        }
      }
    }
  }
  `

const CHALLENGE_MESSAGE_SUBSCRIPTION = gql`
  subscription ChallengeMsgSub($challengeId:ID!){
    challengeMsg(challengeId:$challengeId){
      node{
        id
        challengeMessage
        addedDate
        addedBy{
          firstName
          lastName
        }
      }
    }
  }
  `


export default class ChallengeDashboard extends React.Component {

  static navigationOptions = {
    title: 'Challenge Answer'
  };

    this.state = {
      challenge:''
    }



  render() {
    const { navigation } = this.props
    const { challenge } = this.state

    const answerId = navigation.getParam('answerId', 'NO-ID')
    const questionId = navigation.getParam('answerId', 'NO-ID')

    return (
      <ScrollView contentContainerStyle={styles.container}>

        <Query query={CHALLENGE_QUESTION_QUERY} variables={{ questionId: questionId }}>
              {({ loading, error, data }) => {
                if (loading) return <Loading1 />
                if (error) return <Text>{JSON.stringify(error)}</Text>

                const questionToRender = data.question

                const correctAnswer = questionToRender.choices.filter(choice => choice.correct === true)

            return (
              <>
              <Text style={styles.welcome}>
                {questionToRender.test.subject} - {questionToRender.test.testNumber}
              </Text>

              <Text style={styles.welcome}>
                {questionToRender.question}
              </Text>

              <Text style={styles.welcome}>
                Correct: {correctAnswer[0]}
              </Text>

              {questionToRender.challenges.map(challenge => <ChallengeRow key={challenge.id} {...challenge} />)}

            </>
          )
        }}
        </Query>

        <TextInput
          placeholder='Challenge Question'
          style={{height: 80,width: 320, backgroundColor:'white',borderRadius: 10,borderColor: 'darkgrey',margin:5,padding:10}}
          onChangeText={(text) => this.setState({challenge:text})}
          multiline={true}
          numberOfLines={4}
          value={this.state.challenge}
         />

         <Mutation
             mutation={CREATE_CHALLENGE_MUTATION}
             variables={{ answerId: answerId, challenge:challenge }}
             onCompleted={data => this._confirm(data)}
             {mutation => (

               <ButtonColor
               title="Challenge Question"
               backgroundcolor="#900000"
               onpress={mutation}
               />
               //<Button size="tiny" color='teal' onClick={mutation}>Submit</Button>
             )}
           </Mutation>

         <ButtonColor
         title="Cancel"
         backgroundcolor="#282828"
         onpress={() => this.props.navigation.navigate('TestDashboard',{ testId: answerToRender.question.test.id })}
         />

      </ScrollView>
    );
  }
  _confirm = (data) => {
    const { id } = data.addChallenge
    this.props.navigation.navigate('ChallengeChat',{ challengeId: id })
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 200,
    marginBottom: 16,
    marginTop: 32,
    width: 320,
  },
  input:{
    height: 40,
    width: 300,
    backgroundColor:'white',
    borderRadius: 5,
    borderColor: 'darkgrey',
    margin:5,
    padding:10
  }
});
