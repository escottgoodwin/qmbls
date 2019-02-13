import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { Button, Card } from 'react-native-elements'
import { Query } from "react-apollo";
import gql from "graphql-tag";
import dateFormat from 'dateformat'
import Loading1 from '../components/Loading1'

import TestCard from '../components/TestCard'
import ButtonColor from '../components/ButtonColor'
import AnsweredStats from '../components/AnsweredStats'
import QuestionStats from '../components/QuestionStats'

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
      <View style={styles.container}>
      <ScrollView>
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
          <Text style={styles.welcome}>
            { dateFormat(testToRender.testDate, "dddd, mmmm dS, yyyy") }
          </Text>

          <AnsweredStats navigation={this.props.navigation} testId={testId} />

          <QuestionStats navigation={this.props.navigation} testId={testId} />


            <ButtonColor
            title="All Questions"
            backgroundcolor="#1abc9c"
            onpress={() => this.props.navigation.navigate('AllQuestions',{testId:testToRender.id})}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
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
