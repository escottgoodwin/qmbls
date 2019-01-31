import React from 'react';
import { StyleSheet, Platform,Image, Text, View, ScrollView,TextInput,Alert,FlatList,TouchableOpacity,Dimensions} from 'react-native';
import { Button,Card } from 'react-native-elements'
import RadioGroup from 'react-native-radio-buttons-group';

import ButtonColor from '../components/ButtonColor'
import AnswerChoice from '../components/AnswerChoice'

const ANSWER_QUESTION_QUERY = gql`
  query CreateReviewQuery($questionId:ID!){
    question(id:$questionId){
      id
      question
      choices {
        choice
        correct
      }
      panel{
        link
        id
      }
      test{
        id
        subject
        course{
          name
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
      answer{
        choice
      }
      answerCorrect
      question{
        question
        choices{
          id
          choice
          correct
        }
      }
    }
  }
`

export default class AnswerQuestion extends React.Component {

  static navigationOptions = {
    title: 'Answer Question',
  };

  state = {
          checkboxes: [],
      };

  onPress = data => this.setState({ checkboxes });

  render() {
    const { navigation } = this.props;

    const questionId = navigation.getParam('questionId', 'NO-ID')

    let selectedButton = this.state.data.find(e => e.selected == true);

    selectedButton = selectedButton ? selectedButton.value : this.state.checkboxes[0].label;

    return (

      <ScrollView >
      <View style={styles.container}>
      <Query query={ANSWER_QUESTION_QUERY} variables={{ questionId: questionId, answerChoiceId: answerChoiceId }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading1 />
              if (error) return <Text>{JSON.stringify(error)}</Text>

              const questionToRender = data.question
              const checkboxes = questionToRender.choices.map(choice =>
               {
                 label: choice.choice,
                 value: choice.id,
                })

              this.setState({checkboxes})

          return (
            <>
            <Text style={styles.welcome}>
            {questionToRender.test.course.name} - {questionToRender.test.course.institution.name}
            </Text>

            <Text style={styles.welcome}>
            {questionToRender.test.subject} - {questionToRender.test.testNumber}
            </Text>

            <Text style={styles.welcome}>
              {questionToRender.question}
            </Text>

             <RadioGroup radioButtons={this.state.checkboxes} onPress={this.onPress} />
            </>
            )

          }}
          </Query>

             <Mutation
                 mutation={ANSWER_QUESTION_MUTATION}
                 variables={{
                   questionId: questionId,
                   answerChoiceIds: this.state.checkboxes.map(choice => choice.choiceId)
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
           title="Edit"
           backgroundcolor="#282828"
           onpress={() => this.props.navigation.navigate('EditQuestion',{ questionId:questionId })}
           />

          <ButtonColor
          title="Cancel"
          backgroundcolor="#282828"
          onpress={() => this.props.navigation.navigate('StudentDashboard')}
          />
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4f1fe',
  },
  card:{
    height: 320,
    width: Dimensions.get('window').width * .8
  },
  choice:{
    width: 250,
    fontSize:18,
    margin:10,
    color:'#282828'
  },
  question:{
    width: 250,
    fontWeight:'bold',
    fontSize:18,
    color:'#282828'
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
