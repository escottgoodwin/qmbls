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

const CHALLENGE_ANSWER_QUERY = gql`
query ChallengeAnswerQuery($questionId:ID!){
  answers(where:{question:{id:$questionId}}){
    answers{
    id
    answer{
      id
      choice
      correct
    }
    question{
      id
      question
      panel{
        id
        link
      }
      choices{
        id
        choice
        correct
      }
      challenges{
        id
        challenge
      }
      test{
        id
        subject
        testNumber
        course
        {
          id
          name
          institution{
            id
            name
          }
        }
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

export default class ChallengeDashboard extends React.Component {

  static navigationOptions = {
    title: 'Challenge Answer'
  }

    state = {
      challenge:'',
      isVisible: false,
      errorMessage:''
    }


  render() {
    const { navigation } = this.props
    const { challenge, isVisible, errorMessage } = this.state

    const answerId = navigation.getParam('answerId', 'NO-ID')
    const questionId = navigation.getParam('questionId', 'NO-ID')

    return (
      <ScrollView contentContainerStyle={styles.container}>

        <Query query={CHALLENGE_ANSWER_QUERY} variables={{ questionId: questionId }}>
              {({ loading, error, data }) => {
                if (loading) return <Loading1 />
                if (error) return <Text>{JSON.stringify(error)}</Text>

                const questionToRender = data.answers.answers[0]

            return (
              <>
              <Text style={styles.welcome}>
              {questionToRender.question.test.course.name} - {questionToRender.question.test.course.institution.name}
              </Text>

              <Text style={styles.welcome}>
                {questionToRender.question.test.subject} - {questionToRender.question.test.testNumber}
              </Text>

              <Text style={styles.choice}>
                {questionToRender.question.question}
              </Text>

              <Text style={styles.choice}>
                Correct: {questionToRender.question.choices.filter(choice => choice.correct)[0].choice}
              </Text>

              <Text style={styles.choice}>
                Your Choice: {questionToRender.answer.choice}
              </Text>

              <Image key={questionToRender.question.panel.link} source={{uri: questionToRender.question.panel.link }} style={styles.logo} />

        <TextInput
          placeholder='Challenge Question'
          style={{height: 80,width: 320, backgroundColor:'white',borderRadius: 10,borderColor: 'darkgrey',margin:5,padding:10}}
          onChangeText={(text) => this.setState({challenge:text})}
          multiline={true}
          numberOfLines={4}
          value={this.state.challenge}
         />

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
               challenge: challenge,
               answerId: answerId
             }}
             onCompleted={data => this._confirm(data)}
             onError={error => this._error (error)}
           >
             {mutation => (
               <ButtonColor
               title="Submit Challenge"
               backgroundcolor="#282828"
               onpress={mutation}
               />
             )}
           </Mutation>

         <Text style={styles.welcome}>
           Other Challenges of this Question
         </Text>

         {questionToRender.question.challenges.map(challenge => <ChallengeRow key={challenge.id} {...challenge} />)}

         <ButtonColor
         title="Cancel"
         backgroundcolor="#282828"
         onpress={() => this.props.navigation.navigate('TestDashboard',{ testId: questionToRender.question.test.id })}
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
    this.props.navigation.navigate('Challenge',{ challengeId: id })
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
    flexDirection:"row",
    minHeight: 50,
    alignItems: 'center',
    backgroundColor:'white',
    width: 300,
    padding:10,
    margin:10
  },
  question:{
    fontSize: 20,
    minHeight: 50,
    alignItems: 'center',
    backgroundColor:'white',
    width: 300,
    padding:10,
    margin:10
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
