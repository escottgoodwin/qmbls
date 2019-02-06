import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions,  } from 'react-native';
import PropTypes from 'prop-types';
import { Button, CheckBox } from 'react-native-elements'
const moment = require('moment')

import ButtonColor from '../components/ButtonColor'


const ChallengeRow = (props) =>

  <View style={styles.choices}>

  <Text>{props.challenge} </Text>
  <Text>{props.addedBy.firstName} {props.addedBy.lastName} </Text>
  <Text>{moment(props.addedDate).calendar()}</Text>

  <ButtonColor
  title="Go"
  backgroundcolor="#282828"
  onpress={() => this.props.navigation.navigate('ChallengeChat',{ challengeId: props.id })}
  />
  </View>

const styles = StyleSheet.create({
  choices:{
    flexDirection:"row",
    justifyContent: 'center',
    alignItems: 'center',
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

Choice.propTypes = {
  placeholder: PropTypes.string.isRequired,
  changetext: PropTypes.func.isRequired
};

export default ChallengeRow
