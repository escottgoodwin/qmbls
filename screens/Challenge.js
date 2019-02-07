import React from 'react';
import { StyleSheet, Platform, FlatList, Image, Text, View, ScrollView,TextInput,Alert,Dimensions} from 'react-native';
import { Button,Card } from 'react-native-elements'

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
      <ScrollView contentContainerStyle={styles.container}>

        <Query query={CHALLENGE_QUERY} variables={{ challengeId: challengeId }}>
              {({ loading, error, data }) => {
                if (loading) return <Loading1 />
                if (error) return <Text>{JSON.stringify(error)}</Text>

                const challengeToRender = data.challenge

            return (
              <>
              <Text style={styles.welcome}>
              {challengeToRender.answer.answer.question.test.subject} - {challengeToRender.answer.answer.question.test.testNumber}
              </Text>

              <Text style={styles.choice}>
                  Correct: {challengeToRender.answer.answer.question.choices.filter(choice => choice.correct)[0].choice}
              </Text>

              <Text style={styles.choice}>
                Your Choice: {challengeToRender.answer.answer.choice}
              </Text>

              <Image key={challengeToRender.answer.answer.question.panel.link} source={{uri: challengeToRender.answer.answer.question.panel.link }} style={styles.logo} />

              <Text style={styles.choice}>
                Challenge: {challengeToRender.challenge}
              </Text>

              <ChallengeChat {...challengeToRender}/>

         <ButtonColor
         title="Cancel"
         backgroundcolor="#282828"
         onpress={() => this.props.navigation.navigate('TestDashboard',{ testId: challengeToRender.question.test.id })}
         />
         </>
       )
     }}
     </Query>

      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    minHeight:800
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
