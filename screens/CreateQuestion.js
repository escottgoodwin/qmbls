import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TextInput, Alert} from 'react-native';
import { Button } from 'react-native-elements'

import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import ButtonColor from '../components/ButtonColor'
import Choice from '../components/Choice'
import Loading1 from '../components/Loading1'

const CREATE_QUESTION_QUERY = gql`
query CreateQuestionQuery($questionId:ID!){
  question(id:$questionId){
    id
    question
    sentPanel{
      link
      id
    }
    test{
      id
      subject
      testDate
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

const CREATE_QUESTION_MUTATION = gql`
mutation CreateQuestion(
  $question: String!,
  $testId:ID!,
  $panelId:ID!,
  $choice1:String!,
  $choiceCorrect1: Boolean!,
  $choice2:String!,
  $choiceCorrect2: Boolean!,
  $choice3:String!,
  $choiceCorrect3: Boolean!,
  $choice4:String!,
  $choiceCorrect4: Boolean!,
  ){
    createQuestion(
      question: $question,
      testId:$testId,
      panelId:$panelId,
      choice1: $choice1,
      choiceCorrect1: $choiceCorrect1,
      choice2: $choice2,
      choiceCorrect2: $choiceCorrect2,
      choice3: $choice3,
      choiceCorrect3: $choiceCorrect3,
      choice4: $choice4,
      choiceCorrect4: $choiceCorrect4,
    ){
        id
        test{
          id
        }
      }
    }
  `

export default class CreateQuestion extends React.Component {

  static navigationOptions = {
    title: 'Create Question1',
  };

  state = {
    questionId:'',
    testId:'',
    panelId:'',
    question:'',
    choice1:'',
    choiceCorrect1:false,
    choice2:'',
    choiceCorrect2:false,
    choice3:'',
    choiceCorrect3:false,
    choice4:'',
    choiceCorrect4:false,
  };

  render(){
    const { navigation } = this.props;

    const questionId = navigation.getParam('questionId', 'NO-ID')

    const {
    question,
    choice1,
    choiceCorrect1,
    choice2,
    choiceCorrect2,
    choice3,
    choiceCorrect3,
    choice4,
    choiceCorrect4,
    } = this.state

    return(
      <ScrollView contentContainerStyle={styles.container}>
      <Query query={CREATE_QUESTION_QUERY} variables={{ questionId: questionId }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading1 />
              if (error) return <Text>{JSON.stringify(error)}</Text>

              const questionToRender = data.question

          return (
            <>
            <Text style={styles.welcome}>
            {questionToRender.test.course.name} - {questionToRender.test.course.institution.name}
            </Text>

            <Text style={styles.welcome}>
            {questionToRender.test.subject} - {questionToRender.test.testNumber}
            </Text>

            <Text style={styles.welcome}>
            {this.state.question}
            </Text>

            <Image key={questionToRender.sentPanel.link} source={{uri: questionToRender.sentPanel.link }} style={styles.logo} />


            <TextInput
              placeholder='Question'
              style={styles.question}
              onChangeText={(text) => this.setState({question: text})}
              multiline={true}
              numberOfLines={4}
              value={this.state.question}
             />

             <Choice
             changetext={(text) => this.setState({choice1:text})}
             changecheck={() => this.setState({choiceCorrect1: !this.state.choiceCorrect1})}
             choiceValue={this.state.choice1}
             choiceCorrect={this.state.choiceCorrect1}
             placeholder='Choice 1'
             />

             <Choice
             changetext={(text) => this.setState({choice2:text})}
             changecheck={() => this.setState({choiceCorrect2: !this.state.choiceCorrect2})}
             choiceValue={this.state.choice2}
             choiceCorrect={this.state.choiceCorrect2}
             placeholder='Choice 2'
             />

             <Choice
             changetext={(text) => this.setState({choice3:text})}
             changecheck={() => this.setState({choiceCorrect3: !this.state.choiceCorrect3})}
             choiceValue={this.state.choice3}
             choiceCorrect={this.state.choiceCorrect3}
             placeholder='Choice 3'
             />

             <Choice
             changetext={(text) => this.setState({choice4:text})}
             changecheck={() => this.setState({choiceCorrect4: !this.state.choiceCorrect4})}
             choiceValue={this.state.choice4}
             choiceCorrect={this.state.choiceCorrect4}
             placeholder='Choice 4'
             />

             <Mutation
                 mutation={CREATE_QUESTION_MUTATION}
                 variables={{
                   testId: questionToRender.test.id,
                   panelId: questionToRender.sentPanel.id,
                   question: question,
                   choice1: choice1,
                   choice2: choice2,
                   choice3: choice3,
                   choice4: choice4,
                   choiceCorrect1: choiceCorrect1,
                   choiceCorrect2: choiceCorrect2,
                   choiceCorrect3: choiceCorrect3,
                   choiceCorrect4: choiceCorrect4,
                 }}
                 onCompleted={data => this._confirm(data)}
               >
                 {mutation => (
                   <ButtonColor
                   title="Review"
                   backgroundcolor="#282828"
                   onpress={mutation}
                   />
                 )}
               </Mutation>

             <ButtonColor
             title="Cancel"
             backgroundcolor="#282828"
             onpress={() => this.props.navigation.navigate('StudentDashboard')}
             />
             </>
           )
         }}
         </Query>
      </ScrollView>
    )
  }

  _confirm = (data) => {
    const { id, test } = data.createQuestion
    const { navigation } = this.props;
    const questionId = navigation.getParam('questionId', 'NO-ID')
    this.props.navigation.navigate('ReviewQuestion',{ newQuestionId: id, oldQuestionId: questionId, testId: test.id })
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4f1fe',
    minHeight:800
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
  },
  logo: {
    height: 220,
    marginBottom: 15,
    marginTop: 15,
    width: 350,
  },
  choices:{
    flexDirection:"row",
    justifyContent: 'center',
    alignItems: 'center',
  },
  choicetext:{
    fontWeight:'bold',
    fontSize:18,
    color:'#484848'
  },
  question:{
    height: 80,
    width: 350,
    backgroundColor:'white',
    borderRadius: 10,
    margin:5,
    padding:10
  },
  input:{
    height: 40,
    width: 250,
    backgroundColor:'white',
    borderRadius: 10,
    margin:5,
    padding:10
  },
  answer:{
    height: 40,
    width: 100,
    backgroundColor:'white',
    borderRadius: 10,
    margin:5,
    padding:10
  }
});
