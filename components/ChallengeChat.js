import React from 'react';
import { StyleSheet, Platform, FlatList, Image, Text, View, ScrollView,TextInput,Alert} from 'react-native';
import { Button,Card } from 'react-native-elements'

import DisputeQuestion from '../components/DisputeQuestion'
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import ButtonColor from '../components/ButtonColor'
import Loading1 from '../components/Loading1'
import QAList from '../components/QAList'
import ChallengeMessageList from '../components/ChallengeMessageList'

const CHALLENGE_MESSAGE_QUERY = gql`
query ChallengeMessages($challengeId:ID!){
  challengeMessages(where:{challenge:{id:$challengeId}}){
    count
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


export default class ChallengeChat extends React.Component {

  static navigationOptions = {
    title: 'Challenge Answer'
  };

    state = {
      challengeMessage:'',
      isVisible: false,
      errorMessage:''
    }

  render() {
    const { id } = this.props

    const { challengeMessage, isVisible, errorMessage } = this.state

    return (
      <ScrollView contentContainerStyle={styles.container}>
      <Query query={CHALLENGE_MESSAGE_QUERY} variables={{ challengeId: id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading1 />
              if (error) return <Text>{JSON.stringify(error)}</Text>

              const challengeMessages = data.challengeMessages.challengeMessages

          return (
            <>

            <ChallengeMessageList {...challengeMessages}
              subscribeToNewChallengeMessage={() =>
                subscribeToMore({
                  document: CHALLENGE_MESSAGE_SUBSCRIPTION,
                  variables: {challengeId: id },
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev
                    const newChallengeMsg = subscriptionData.data.challengeMsg.node
                    return  Object.assign({}, prev, {
                      challengeMessages: {
                        challengeMessages: [...prev.challengeMessages,newChallengeMsg],
                        __typename: prev.challengeMsg.__typename
                    }
                    })
                  }
                })
              }
              />

            <TextInput
              placeholder='Challenge Message'
              style={{height: 40,width: 320, backgroundColor:'white',borderRadius: 10,borderColor: 'darkgrey',margin:5,padding:10}}
              onChangeText={(text) => this.setState({challengeMessage:text})}
              multiline={true}
              numberOfLines={2}
              value={this.state.challengeMessage}
             />

             <Mutation
                 mutation={ADD_CHALLENGE_MESSAGE_MUTATION}
                 variables={{ challengeId: id, challengeMessage:challengeMessage }}
                 onCompleted={data => this._confirm(data)}
                 >
                 {mutation => (
                   <ButtonColor
                   title="Send"
                   backgroundcolor="#282828"
                   onpress={mutation}
                   />
                 )}
               </Mutation>
       </>
     )
   }}
   </Query>

    </ScrollView>
    )
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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
