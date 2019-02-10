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
    mutation AddChallengeMessage($challengeId: ID!,
      $challengeMessage: String!) {
        addChallengeMessage(challengeMessage: $challengeMessage,
          challengeId: $challengeId){
            id
            challengeMessage
            addedDate
            addedBy{
              firstName
              lastName
              id
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
      challengeMessages1:[]
    }

    componentDidMount(){
      const { challenge } = this.props
      this.setState({challengeMessages1:challenge.challengeMessages,count:challenge.challengeMessages.length})
    }

  render() {
    const { challenge } = this.props
    const challengeId = challenge.id
    const { challengeMessage, isVisible, errorMessage } = this.state

    return (
      <View style={styles.container}>
            <>
            <Text>Messages - {challenge.challengeMessages.length}</Text>

            <FlatList
            data={challenge.challengeMessages}
            renderItem={
              ({ item, index }) => (
                  <ChallengeMessageRow key={item.id} {...item}/>
                )
            }
            keyExtractor={item => item.id}
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
      </View>
      )
    }
  _confirm = (data) => {
    let challengeMessagesUpdate = [...this.state.challengeMessages1,data.addChallengeMessage]
    this.setState({challengeMessages1:challengeMessagesUpdate,challengeMessage:'',count:challengeMessagesUpdate.length})
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
