import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView,TextInput, Alert} from 'react-native';
import { Button } from 'react-native-elements'


import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import ButtonColor from '../components/ButtonColor'
import Choice from '../components/Choice'
import Loading1 from '../components/Loading1'
import EditQuestionForm from '../components/EditQuestionForm'

const EDIT_QUESTION_QUERY = gql`
query EditQuestionQuery($questionId:ID!){
  question(id:$questionId){
    id
    question
    choices{
      id
      choice
      correct
    }
    panel{
      link
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

export default class EditQuestion extends React.Component {

  static navigationOptions = {
    title: 'Edit Question',
  };

  render(){
    const { navigation } = this.props;

    const questionId = navigation.getParam('questionId', 'NO-ID')

    return(
      <ScrollView contentContainerStyle={styles.container}>
      <Query query={EDIT_QUESTION_QUERY} variables={{ questionId: questionId }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading1 />
              if (error) return <Text>{JSON.stringify(error)}</Text>

              const questionToRender = data.question

          return (
            <>
            <EditQuestionForm navigation={navigation} question={questionToRender}/>

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
