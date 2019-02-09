import React from 'react';
import { StyleSheet, Platform, FlatList, Image, Text, View, ScrollView,TextInput,Alert,Dimensions} from 'react-native';
import { Button,Card } from 'react-native-elements'
const moment = require('moment')

import DisputeQuestion from '../components/DisputeQuestion'
import { Query } from "react-apollo";
import gql from "graphql-tag";

import ButtonColor from '../components/ButtonColor'
import Loading1 from '../components/Loading1'
import QAList from '../components/QAList'
import ChallengeChat from '../components/ChallengeChat'

const CHALLENGE_QUERY = gql`
query ChallengeQuery($challengeId:ID!){
    challenge(id:$challengeId){
    id
    challenge
    challengeMessages{
      id
      challengeMessage
      addedDate
      addedBy{
        firstName
        lastName
      }
    }
    answer{
      id
      answer{
        id
        choice
        correct
        question{
          id
          question
          panel{
            id
            link
          }
          addedDate
          addedBy{
            id
            firstName
            lastName
          }
          choices{
            id
            correct
            choice
          }
          test{
            id
            subject
            testNumber
            course{
              id
              name
            }
          }
        }
      }
    }
    addedBy{
      id
      firstName
      lastName
    }
    addedDate
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


export default class Challenge extends React.Component {

  static navigationOptions = {
    title: 'Question Challenge'
  };

  state = {
    challenge:'',
    isVisible: false,
    errorMessage:''
  }

  render() {
    const { navigation } = this.props;

    const challengeId = navigation.getParam('challengeId', 'NO-ID')

    const { challenge, challengeMessage, isVisible, errorMessage } = this.state

    return (
      <View style={styles.container}>
      <ScrollView>

        <Query query={CHALLENGE_QUERY} variables={{ challengeId: challengeId }}>
              {({ loading, error, data }) => {
                if (loading) return <Loading1 />
                if (error) return <Text>{JSON.stringify(error)}</Text>

                const challenge = data.challenge

            return (
              <>
              <Text style={styles.welcome}>
              {challenge.answer.answer.question.test.subject} - {challenge.answer.answer.question.test.testNumber}
              </Text>

              <Text style={styles.choice}>
                  Correct: {challenge.answer.answer.question.choices.filter(choice => choice.correct)[0].choice}
              </Text>

              <Text style={styles.choice}>
                Your Choice: {challenge.answer.answer.choice}
              </Text>

              <Image key={challenge.answer.answer.question.panel.link} source={{uri: challenge.answer.answer.question.panel.link }} style={styles.logo} />

              <Text style={styles.choice}>
                Challenge: {challenge.challenge}
              </Text>

              <ChallengeChat navigation={this.props.navigation} challengeId={challengeId} challenge={challenge}
                subscribeToNewChallengeMessage={() =>
                  subscribeToMore({
                    document: CHALLENGE_MESSAGE_SUBSCRIPTION,
                    variables: {challengeId: challengeId },
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

         <ButtonColor
         title="Cancel"
         backgroundcolor="#282828"
         onpress={() => navigation.navigate('TestDashboard',{ testId: challenge.question.test.id })}
         />
         </>
       )
     }}
     </Query>

      </ScrollView>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  choice:{
    fontSize: 18,
    flexDirection:"row",
    minHeight: 50,
    alignItems: 'center',
    backgroundColor:'white',
    width: 300,
    padding:10,
    margin:10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  logo: {
    height: 200,
    marginBottom: 16,
    marginTop: 16,
    width: Dimensions.get('window').width * .85,
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
