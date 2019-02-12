import React from 'react';
import { StyleSheet, Platform, FlatList, Image, Text, View, ScrollView,TextInput,Alert} from 'react-native';
import { Button,Card } from 'react-native-elements'
const moment = require('moment')

import DisputeQuestion from '../components/DisputeQuestion'
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import ButtonColor from '../components/ButtonColor'
import Loading1 from '../components/Loading1'
import QAList from '../components/QAList'
import ChallengeMessageList from '../components/ChallengeMessageList'
import ChallengeMessageRow from '../components/ChallengeMessageRow'


  const ADD_CHALLENGE_MESSAGE_MUTATION = gql`
  mutation AddChallengeMessage($challengeId: ID!,
    $challengeMessage: String!){
      addChallengeMessage(challengeMessage:$challengeMessage,
      challengeId:$challengeId){
        id
        addedBy{
          firstName
          lastName
        }
      }
    }
  `

  const CHALLENGE_MESSAGE_QUERY = gql`
  query ChallengeMessages($challengeId:ID!){
     challengeMessages(where:{challenge:{id:$challengeId}}){
    	challengeMessages{
        id
        challengeMessage
        addedDate
        addedBy{
          id
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
            id
            firstName
            lastName
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
      count:'',
      isVisible: false,
      errorMessage:'',
      challengeMessages:[],
    }

  render() {
    const { challengeId } = this.props
    const { challengeMessage, isVisible, errorMessage } = this.state

    return (
      <View style={styles.container}>

            <Query query={CHALLENGE_MESSAGE_QUERY} variables={{ challengeId: challengeId }}>
                  {({ loading, error, data, subscribeToMore }) => {
                    if (loading) return <Loading1 />
                    if (error) return <Text>{JSON.stringify(error)}</Text>

                    const challengeMessages = data.challengeMessages

                return (
                  <>
                  <ChallengeMessageList {...challengeMessages}
                  subscribeToNewChallengeMessage={() =>
                    subscribeToMore({
                      document: CHALLENGE_MESSAGE_SUBSCRIPTION,
                      variables: {challengeId: challengeId },
                      updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) return prev
                        const newChallengeMsg = subscriptionData.data.challengeMsg.node
                        return  Object.assign({}, prev, {
                          challengeMessages: {
                            challengeMessages: [...prev.challengeMessages.challengeMessages, newChallengeMsg],
                            __typename: prev.challengeMessages.__typename
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
                 variables={{ challengeId: challengeId, challengeMessage:challengeMessage }}
                 onCompleted={data => this._confirm(data)}
                 refetchQueries={() => {
                    return [{
                       query: gql`
                       query ChallengeQuery($challengeId:ID!){
                           challenge(id:$challengeId){
                           id
                           challenge
                           challengeMessages{
                             id
                             challengeMessage
                             addedDate
                             addedBy{
                               id
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
                     `,
                       variables: { challengeId: challengeId }
                   }];
                   }}
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

      </View>
      )
    }
  _confirm = (data) => {
    const { id } = data
    this.setState({challengeMessage:''})
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
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
