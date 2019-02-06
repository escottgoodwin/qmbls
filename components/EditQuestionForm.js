import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView,TextInput, Alert} from 'react-native';
import { Button } from 'react-native-elements'

import ButtonColor from '../components/ButtonColor'
import Choice from '../components/Choice'
import Loading1 from '../components/Loading1'


import { Query, Mutation } from "react-apollo"
import gql from "graphql-tag";

const EDIT_QUESTION_MUTATION = gql`
  mutation EditQuestion(
    $id:ID!,
    $question:String,
    $choice1:String,
    $choice1Id:ID,
    $choiceCorrect1: Boolean,
    $choice2:String,
    $choice2Id:ID,
    $choiceCorrect2: Boolean,
    $choice3:String,
    $choice3Id:ID,
    $choiceCorrect3: Boolean,
    $choice4:String,
    $choice4Id:ID,
    $choiceCorrect4: Boolean,
    ){
      updateQuestion(
        id:$id,
        question:$question,
        choice1: $choice1,
        choice1Id: $choice1Id,
        choiceCorrect1: $choiceCorrect1,
        choice2: $choice2,
        choice2Id: $choice2Id,
        choiceCorrect2: $choiceCorrect2,
        choice3: $choice3,
        choice3Id: $choice3Id,
        choiceCorrect3: $choiceCorrect3,
        choice4: $choice4,
        choice4Id: $choice4Id,
        choiceCorrect4: $choiceCorrect4,
      ){
          id
        }
      }
  `

export default class EditQuestionForm extends React.Component {

  state = {
    question:'',
    choice1:'',
    choiceCorrect1:false,
    choice2:'',
    choiceCorrect1:false,
    choice3:'',
    choiceCorrect1:false,
    choice4:'',
    choiceCorrect1:false,
    isVisible:false,
    errorMessage:''
  };

  componentDidMount(){

    const {
      question,
      choices
    } = this.props.question

    this.setState({
      question,
      choice1:choices[0].choice,
      choiceCorrect1:choices[0].correct,
      choice2:choices[1].choice,
      choiceCorrect2:choices[1].correct,
      choice3:choices[2].choice,
      choiceCorrect3:choices[2].correct,
      choice4:choices[3].choice,
      choiceCorrect14:choices[3].correct,
    })
  }

  render(){

    const {
      id,
      test,
      panel,
      choices
    } = this.props.question

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
      <>
      <Text style={styles.welcome}>
      {test.course.name} - {test.course.institution.name}
      </Text>

      <Text style={styles.welcome}>
      {test.subject} - {test.testNumber}
      </Text>

      <Image key={panel.link} source={{uri: panel.link }} style={styles.logo} />

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
       choiceId={this.state.choice4Id}
       placeholder='Choice 4'
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
           mutation={EDIT_QUESTION_MUTATION}
           variables={{
             id: id,
             question: question,
             choice1: choice1,
             choice2: choice2,
             choice3: choice3,
             choice4: choice4,
             choiceCorrect1: choiceCorrect1,
             choiceCorrect2: choiceCorrect2,
             choiceCorrect3: choiceCorrect3,
             choiceCorrect4: choiceCorrect4,
             choice1Id: choices[0].id,
             choice2Id: choices[1].id,
             choice3Id: choices[2].id,
             choice4Id: choices[3].id,
           }}
           onCompleted={data => this._confirm(data)}
           onError={error => this._error (error)}
         >
           {mutation => (
             <ButtonColor
             title="Review"
             backgroundcolor="#282828"
             onpress={mutation}
             />
           )}
         </Mutation>

       </>
    )
  }

  _error = async error => {
      //this.props.navigation.navigate('Error',{error: JSON.stringify(error)})
      //const errorMessage = error.graphQLErrors.map((err,i) => err.message)
      const errorMessage = error.graphQLErrors.map((err,i) => err.message)

      this.setState({ isVisible: true, errorMessage})
  }
  _confirm = (data) => {
    const { id } = data.updateQuestion
    const { navigation } = this.props;
    navigation.navigate('ReviewQuestion',{ questionId: id })
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
