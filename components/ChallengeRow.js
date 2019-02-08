import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity  } from 'react-native';
import PropTypes from 'prop-types';
import { Button, CheckBox } from 'react-native-elements'
const moment = require('moment')

import ButtonColor from '../components/ButtonColor'

const ChallengeRow = (props) =>

  <View style={styles.choices}>

  <TouchableOpacity style={styles.touch}
  onpress={() => props.navigation.navigate('Challenge',{ challengeId: props.challenge.id })}
  >
  <Text>Challenge: {props.challenge.challenge} </Text>
  <Text>{props.challenge.addedBy.firstName} {props.challenge.addedBy.lastName}</Text>
  <Text>{moment(props.challenge.addedDate).calendar()}</Text>

  </TouchableOpacity>

  </View>

const styles = StyleSheet.create({
  choices:{
    flexDirection:"row",
    justifyContent: 'center',
    alignItems: 'center',
  },
  touch: {
    width: 300,
    margin:5,
    backgroundColor:"white",
    borderColor:"#e4fef1",
    borderRadius:5,
    padding:3
  },
  choicetext:{
    fontWeight:'bold',
    fontSize:18,
    color:'#484848'
  },
  input:{
    height: 40,
    width: Dimensions.get('window').width * .75,
    backgroundColor:'white',
    borderRadius: 10,
    margin:5,
    padding:10
  },
});

export default ChallengeRow
