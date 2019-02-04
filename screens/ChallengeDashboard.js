import React from 'react';
import { StyleSheet, Platform, FlatList, Image, Text, View, ScrollView,TextInput,Alert} from 'react-native';
import { Button,Card } from 'react-native-elements'

import DisputeQuestion from '../components/DisputeQuestion'
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import ButtonColor from '../components/ButtonColor'
import Loading1 from '../components/Loading1'
import QAList from '../components/QAList'

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

const CHALLENGE_MESSAGE_QUERY = gql`
  query ChallengeQuery($challengeId:ID!){
    challenge(id:$challengeId){
      challengeMessages{
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
    const { navigation } = this.props;

    const answerId = navigation.getParam('answerId', 'NO-ID')

    return (
      <ScrollView contentContainerStyle={styles.container}>

        <Query query={CHALLENGE_MESSAGE_QUERY} variables={{ challengeId: this.props.challenges.id }}>
              {({ loading, error, data }) => {
                if (loading) return <Loading1 />
                if (error) return <Text>{JSON.stringify(error)}</Text>

                const answerToRender = data.answer

                const correctAnswer = answerToRender.questions.choices.filter(choice => choice.correct === true)

            return (
              <>
              <Text style={styles.welcome}>
              {answerToRender.question.test.subject} - {answerToRender.question.test.testNumber}
              </Text>

              <Text style={styles.welcome}>
                Your Answer: {answerToRender.answer.choice}
              </Text>

              <Text style={styles.welcome}>
                Correct: {correctAnswer[0]}
              </Text>

            <Image key={answerToRender.question.panel.link} source={{uri: answerToRender.question.panel.link} style={[styles.logo]}/>
            </>

            <ChallengeMessageList {...challenge}
              subscribeToNewChallengeMessage={() =>
                subscribeToMore({
                  document: CHALLENGE_MESSAGE_SUBSCRIPTION,
                  variables: {challengeId: this.props.challenges.id },
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev
                    const newChallengeMsg = subscriptionData.data.challengeMsg.node
                    return  Object.assign({}, prev, {
                      challenge: {
                        challengeMessages: [...prev.challenge.challengeMessages,newChallengeMsg],
                        __typename: prev.challenge.__typename
                    }
                    })
                  }
                })
              }
              />
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
             mutation={ADD_CHALLENGE_MESSAGE_MUTATION}
             variables={{ challengeId: this.props.challenges.id, challengeMessage:challengeMessage }}
             onCompleted={data => this._confirm(data)}
             refetchQueries={() => {
                return [{
                   query: gql`
                   query TestChallenges($testId:ID!){
                     test(id:$testId){
                         id
                         subject
                         testNumber
                         testDate

                         course{
                           id
                           name
                           courseNumber
                         }
                         questions{
                           challenges{
                             challenge
                             addedBy{
                               id
                               firstName
                               lastName
                             }
                             challengeMessages{
                               id
                               challengeMessage
                               addedDate
                               addedBy{
                                 firstName
                                 lastName
                               }
                             }
                             id
                             question{
                               question
                               choices{
                                 correct
                                 choice
                               }
                   						questionAnswers{
                                 addedBy{
                                   id
                                   firstName
                                 }
                                 answer{
                                   choice
                                 }
                               }
                               panel{
                                 link
                               }
                               addedBy{
                                 firstName
                                 lastName
                               }
                             }

                           }
                         }

                       }
                   }
                 `,
                   variables: { testId: test_id }
               }];
               }} >
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
    this.props.navigation.navigate('ChallengeDashboard',{ challengeId: id })
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
