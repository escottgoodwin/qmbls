import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { Button, Card } from 'react-native-elements'
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Loading1 from '../components/Loading1'

import TestCard from '../components/TestCard'
import ButtonColor from '../components/ButtonColor'

const TEST_QUERY = gql`
query TestQuery($test_id:ID!){
  test(id:$test_id){
      id
      subject
      testNumber
      testDate
      release
      releaseDate
      published
      publishDate
    	course{
        id
        name
        courseNumber
      }
      panels{
        id
    }
    }
  }
`

export default class TestDashboard extends React.Component {

  static navigationOptions = {
    title: 'Test',
  };


  render() {
    const { navigation } = this.props;

    const testId = navigation.getParam('testId', 'NO-ID')

    return (
      <ScrollView contentContainerStyle={styles.container}>
      <Query query={TEST_QUERY} variables={{ test_id: testId }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading1 />
              if (error) return <Text>Error</Text>

              const testToRender = data.test

          return (
            <>
          <Text style={styles.welcome}>
            {testToRender.course.name} - {testToRender.testNumber}
          </Text>

          <TouchableOpacity style={{margin:10}} onPress={() => this.props.navigation.navigate('QuestionsAnswered',{test_id:testToRender.id})} >
          <Card title='Answered' containerStyle={{width: 300}}>
          <Text style={styles.instructions}>Questions Total:  </Text>
          <Text style={styles.instructions}>Correct:  </Text>
          </Card >
          </TouchableOpacity>

          <TouchableOpacity style={{margin:10}} onPress={() => this.props.navigation.navigate('QuestionsCreated',{test_id:testToRender.id})} >
          <Card title='Created' containerStyle={{width: 300}}>
          <Text style={styles.instructions}>Questions Total:  </Text>
          <Text style={styles.instructions}>Correct: </Text>
          </Card >
          </TouchableOpacity>

          <ButtonColor
          title="Create Question"
          backgroundcolor="#003366"
          onpress={() => this.props.navigation.navigate("CreateQuestion",{questionId: 'cjrn3p73e00760865h8m0brxg'})}
          />

          <ButtonColor
          title="All Questions"
          backgroundcolor="#1abc9c"
          onpress={() => this.props.navigation.navigate('AllQuestions',{test_id:testToRender.id})}
          />


          <ButtonColor
          title="Dashboard"
          backgroundcolor="#003366"
          onpress={() => this.props.navigation.navigate('StudentDashboard')}
          />

          </>
        )
      }}
    </Query>



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
    minHeight:800
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
  }

});
