import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { Button, Card } from 'react-native-elements'

import ButtonColor from '../components/ButtonColor'
import QAList from '../components/QAList'


const ANSWERED_QUESTION_QUERY = gql`
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

export default class QuestionsAnswered extends React.Component {

  static navigationOptions = {
    title: 'Questions Answered',
  };

  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      answered_by:[],
      answer_correct:[],
      test_id:'',
      test_number:'',
      coursename:''
    };
  }


  render() {
    return (
      <ScrollView >
      <View style={styles.container}>
      <Query query={ANSWERED_QUESTION_QUERY} variables={{ questionId: questionId }}>
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


            {questionToRender.answerCorrect ?
              <Text style={styles.welcome}>
              You got it right!
              </Text>
              :
              <Text style={styles.welcome}>
              You got it wrong.
              </Text>
            }

            <Image key={questionToRender.sentPanel.link} source={{uri: questionToRender.sentPanel.link }} style={styles.logo} />

            <Text style={styles.welcome}>
              {questionToRender.question}
            </Text>

            {
              questionToRender.choices.map(choice =>
                <Text style={styles.welcome}>
                {choice.choice} - {choice.correct ? 'Correct' : '' }
                </Text>
              )
            }
            </>
            )

          }}
          </Query>

             <Mutation
                 mutation={SEND_QUESTION_MUTATION}
                 variables={{
                   questionId: newQuestionId,
                   testId: testId
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
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 32,
    width: 120,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize:18
  },
});
