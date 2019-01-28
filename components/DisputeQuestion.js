import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Platform, FlatList, Image, Text, View, ScrollView,TextInput,Alert} from 'react-native';
import { Button,Card } from 'react-native-elements'

const DisputeQuestion = (props) =>
  <View>
  <Card title={props.title} containerStyle={{height: 320,width:320}} >

  <Text style={styles.question}>
  {props.question}
  </Text>

  <FlatList
  data={props.choices}
  renderItem={
    ({ item, index }) => (
       <Text style={styles.item} >{item.value} {item.text} </Text>
    )
  }
  keyExtractor={item => item.text}
  />
  </Card>

  <Text style={styles.correct}>
  Correct Answer: {props.correct}
  </Text>

  </View>

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    item:{
      width: 250,
      fontSize:18,
      margin:10,
      color:'#282828'
    },
    correct:{
      width: 320,
      textAlign:'center',
      fontSize:18,
      fontWeight:'bold',
      margin:10,
      color:'#282828'
    },
    question: {
      width: 250,
      fontWeight:'bold',
      fontSize:18,
      color:'#282828'
    }
  });

DisputeQuestion.propTypes = {
  choices: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  correct: PropTypes.string.isRequired
};

export default DisputeQuestion
