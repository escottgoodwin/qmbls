import React from 'react';
import { StyleSheet, Platform, FlatList, Image, TouchableOpacity, Text, View, ScrollView,TextInput,Alert} from 'react-native';

import { Query } from "react-apollo";
import gql from "graphql-tag";
const moment = require('moment')

import Loading1 from '../components/Loading1'

const CHALLENGE_QUESTION_QUERY = gql`
  query ChallengesQuestionQuery($questionId:ID!){
    challenges(where:{answer:{question:{id:$questionId}}}){
      challenges{
        id
        challenge
        addedDate
        addedBy{
          firstName
          lastName
        }
      }
    }
  }
`

export default class ChallengeList extends React.Component {

  render() {

    const { navigation } = this.props

    return(
      <Query query={CHALLENGE_QUESTION_QUERY} variables={{ questionId: this.props.questionToRender.question.id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading1 />
              if (error) return <Text>{JSON.stringify(error)}</Text>

              const challengesToRender = data.challenges.challenges

          return (

            <FlatList
            data={challengesToRender}
            renderItem={
              ({ item, index }) => (

                <TouchableOpacity style={styles.choice}
                 onPress={() => navigation.navigate('Challenge',{ challengeId: item.id })}
                 >
                 <View style={{fontSize:14,margin:10,borderBottomColor: 'darkgray',
                 borderBottomWidth: 2}}>
                 <Text style={{fontSize:14,marginBottom:3}}>{item.challenge} </Text>
                 <Text style={{fontSize:11,color:'darkgray'}}>{item.addedBy.firstName} {item.addedBy.lastName} {moment(item.addedDate).calendar()}</Text>
                 </View>
                 </TouchableOpacity>

              )
            }
            keyExtractor={item => item.id}
          />

    )
  }}
  </Query>

    )
  }
}

const styles = StyleSheet.create({
  course: {
    textAlign:"center",
    fontSize:20,
    margin:10,
    color:'#282828'
  },
  choice:{
    minHeight: 50,
    backgroundColor:'white',
    width: 300,
    padding:10,
    margin:10
  },
  touch: {
    width: 300,
    margin:5,
    backgroundColor:"white",
    borderColor:"#e4fef1",
    borderRadius:5,
    padding:3
  },
  header:{
    textAlign:"center",
    fontSize: 20,
    margin: 10}
});
