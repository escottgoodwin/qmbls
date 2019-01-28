import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity,Dimensions} from 'react-native';
import { Button, Card } from 'react-native-elements'

const TestCard = (props) =>

<TouchableOpacity style={{margin:10}} onPress={props.onpress} >
<Card title={props.title} containerStyle={styles.card}>
<Text style={styles.instructions}>Questions Total: {props.question_total} </Text>
<Text style={styles.instructions}>Correct: {props.correct} </Text>
</Card >
</TouchableOpacity>

const styles = StyleSheet.create({
  card:{
    width: Dimensions.get('window').width * .8
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4f1fe',
    height:600
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize:18
  }
});

TestCard.propTypes = {
  title: PropTypes.string.isRequired,
  question_total:PropTypes.number.isRequired,
  correct:PropTypes.number.isRequired
};

export default TestCard
