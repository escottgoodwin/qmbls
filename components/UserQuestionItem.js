import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Divider } from 'react-native-elements'
import PropTypes from 'prop-types'

const UserQuestionItem = (props) =>

  <View style={styles.choice} >

   <Text style={{fontSize:16,margin:10}}>{props.question}</Text>

   {props.choices.map(choice => choice.correct ?
     <Text key={choice.id} style={styles.correct}>{choice.choice}</Text>
     :
     <Text key={choice.id} style={styles.incorrect}>{choice.choice}</Text>)}

   <Divider style={{ backgroundColor: '#D3D3D3' }} />

   <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}} >

   <Text style={{fontSize:14,margin:10}} >
   Number: {props.questionAnswers.length}
   </Text>

   <Text style={{fontSize:14,margin:10}} >
   Correct: {props.questionAnswers.filter(answer => answer.answerCorrect).length}
   </Text>

   <Text style={{fontSize:14,margin:10}} >
   {
     props.questionAnswers.filter(answer =>
       answer.answerCorrect).length / props.questionAnswers.length > 0 ?
       Math.round(props.questionAnswers.filter(answer => answer.answerCorrect).length / props.questionAnswers.length*100)
       :
       0
   }%
   </Text>

   </View>

  </View>

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e4f1fe',
    },
    choice:{
      minHeight: 50,
      backgroundColor:'white',
      width: 300,
      padding:10,
      margin:10
    },
    correct:{
      fontSize:12,
      color:'green',
      margin:10,
    },
    incorrect:{
      fontSize:12,
      margin:10,
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


export default UserQuestionItem
