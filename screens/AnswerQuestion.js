import React from 'react';
import { StyleSheet, Platform,Image, Text, View, ScrollView,TextInput,Alert,FlatList,TouchableOpacity,Dimensions} from 'react-native';
import { Button,Card } from 'react-native-elements'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import ButtonColor from '../components/ButtonColor'
import Loading1 from '../components/Loading1'


const ANSWER_QUESTION_QUERY = gql`
  query AnswerQuestionQuery($questionId:ID!){
    question(id:$questionId){
      id
      question
      choices {
        id
        choice
        correct
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

const ANSWER_QUESTION_MUTATION = gql`
  mutation AnswerQuestionMutation(
    $questionId:ID!,
  	$answerChoiceId:ID!){
    addAnswer(
      questionId:$questionId,
      answerChoiceId:$answerChoiceId
    ){
      id
    }
  }
`

export default class AnswerQuestion extends React.Component {

  static navigationOptions = {
    title: 'Answer Question',
  };


  state = {
          answerChoiceId: '',
          chosenLabel:'',
          isVisible: false,
          errorMessage:''
      };

_onSelect = ( item ) => {
  this.setState({
    answerChoiceId:item.value,
    chosenLabel:item.label,
  })
};


  render() {
    const { navigation } = this.props;

    const questionId = navigation.getParam('questionId', 'NO-ID')

    const {isVisible, errorMessage} = this.state

    return (

      <ScrollView >
      <View style={styles.container}>
      <Query query={ANSWER_QUESTION_QUERY} variables={{ questionId: questionId }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading1 />
              if (error) return <Text>{JSON.stringify(error)}</Text>

              const questionToRender = data.question
              const checkboxes = questionToRender.choices.map(choice => ({'value':choice.id, 'label':choice.choice}))


          return (
            <>
            <Text style={styles.welcome}>
            {questionToRender.test.course.name} - {questionToRender.test.course.institution.name}
            </Text>

            <Text style={styles.welcome}>
            {questionToRender.test.subject} - {questionToRender.test.testNumber}
            </Text>

            <View style={styles.question}>
            <Text >
              {questionToRender.question}
            </Text>
            </View>

            <View style={styles.choice}>
            <RadioForm
              radio_props={checkboxes}
              initial={0}
              onPress={(value) => {this.setState({answerChoiceId:value})}}
            />
            </View>
            </>
            )

          }}
          </Query>

          <View>
          {isVisible &&
            <>
            <Text style={styles.messages}>Something is wrong!</Text>
            <Text style={styles.messages}>{errorMessage}</Text>
            </>
          }
          </View>

             <Mutation
                 mutation={ANSWER_QUESTION_MUTATION}
                 variables={{
                   questionId: questionId,
                   answerChoiceId: this.state.answerChoiceId
                 }}
                 onCompleted={data => this._confirm(data)}
                 onError={error => this._error (error)}
               >
                 {mutation => (
                   <ButtonColor
                   title="Submit Answer"
                   backgroundcolor="#282828"
                   onpress={mutation}
                   />
                 )}
               </Mutation>

          </View>
      </ScrollView>
    );
  }

  _error = async error => {
      //this.props.navigation.navigate('Error',{error: JSON.stringify(error)})
      //const errorMessage = error.graphQLErrors.map((err,i) => err.message)
      const errorMessage = error.graphQLErrors.map((err,i) => err.message)

      this.setState({ isVisible: true, errorMessage})
  }

  _confirm = (data) => {
    const { id } = data.addAnswer
    this.props.navigation.navigate('QuestionAnswered',{ answerId: id })
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#e4f1fe',
    height: Dimensions.get('window').height
  },
  card:{
    height: 320,
    width: Dimensions.get('window').width * .8
  },
  choice:{
    width: 300,
    fontSize:18,
    margin:10,
    padding:10,
    color:'#282828',
    backgroundColor:'white'
  },
  question:{
    width: 300,
    fontWeight:'bold',
    fontSize:18,
    padding:10,
    color:'#282828',
    backgroundColor:'white'
  },
  messages: {
    padding:5,
    fontSize:16,
    textAlign:'center',
    color:'red'
  },
  answer:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height:175,
    },
  header:{
    width: 300,
    fontSize:18,
    textAlign:'center',
    color:'#003366',
    margin:5
  }
});
