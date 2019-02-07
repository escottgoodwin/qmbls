import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { Button, Card } from 'react-native-elements'
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Loading1 from '../components/Loading1'

const USER_ANSWERED_QUERY = gql`
query UserAnsweredStats($testId:ID!){
  userAnsweredStats(testId:$testId){
    total
    totalCorrect
    percentCorrect
  }
}
`

export default class AnsweredStats extends React.Component {

  render() {

    return(

      <Query query={USER_ANSWERED_QUERY} variables={{ testId: this.props.testId }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading1 />
              if (error) return <Text>{JSON.stringify(error)}</Text>

              const userAnsweredStats = data.userAnsweredStats

          return (

      <TouchableOpacity style={{margin:10}} onPress={() => this.props.navigation.navigate('QuestionsAnswered',{test_id:this.props.testId})} >
      <Card title='Your Answers' containerStyle={{width: 300}}>
      <Text style={styles.instructions}>Questions Total: {userAnsweredStats.total} </Text>
      <Text style={styles.instructions}>Correct: {userAnsweredStats.totalCorrect} </Text>
      <Text style={styles.instructions}>Percent: {userAnsweredStats.percentCorrect.toFixed(2)*100}% </Text>
      </Card >
      </TouchableOpacity>

      )
    }}
    </Query>


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
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize:18
  }

});
