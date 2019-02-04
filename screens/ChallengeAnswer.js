import React from 'react';
import { StyleSheet, Platform, FlatList, Image, Text, View, ScrollView,TextInput,Alert} from 'react-native';
import { Button,Card } from 'react-native-elements'

import DisputeQuestion from '../components/DisputeQuestion'
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import ButtonColor from '../components/ButtonColor'
import Loading1 from '../components/Loading1'
import QAList from '../components/QAList'

const ANSWERED_QUESTION_QUERY = gql`
query AnswerQuery($answerId:ID!){
  answer(id:$answerId){
    id
    answerCorrect
    answer{
      id
      choice
      correct
    }
    question{
      question
      panel{
        link
      }
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

const CREATE_CHALLNEGE_MUTATION = gql`
mutation CreateChallene($challenge:String!,
  $answerId:ID!){
  addChallenge(challenge:$challenge,
  answerId:$answerId){
    id
    challenge
  }
  }
`

export default class ChallengeAnswer extends React.Component {

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

              {
                answerToRender.answerCorrect ?
                <Text style={styles.welcome}>
                You got it right!
                </Text>
                :
                <Text style={styles.welcome}>
                You got it wrong.
                </Text>
              }

              <Text style={styles.welcome}>
                {answerToRender.question.question}
              </Text>

              {
                answerToRender.question.choices.map(choice =>
                  <View key={choice.id} style={styles.choice}>
                  {choice.correct ?
                    <Icon key={choice.id+'aaa'}
                      name='check-square'
                      type='font-awesome'
                      color='#4AC948'
                       />
                       :
                       <Icon key={choice.id+'eee'}
                         name='times-circle'
                         type='font-awesome'
                         color='#ff0000'
                          />

                  }
                  </View>
              )
            }
            <Image key={answerToRender.question.panel.link} source={{uri: answerToRender.question.panel.link} style={[styles.logo]}/>

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
             mutation={CREATE_CHALLNEGE_MUTATION}
             variables={{
               challenge: this.state.challenge,
               answerId: answerToRender.id,
             }}
             onCompleted={data => this._confirm(data)}
           >
             {mutation => (
               <ButtonColor
               title="Challenge Question"
               backgroundcolor="#900000"
               onpress={mutation}
               />
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
