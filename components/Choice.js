import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions,  } from 'react-native';
import PropTypes from 'prop-types';
import { Button, CheckBox } from 'react-native-elements'

const Choice = (props) =>

  <View style={styles.choices}>

  <TextInput
  placeholder={props.placeholder}
  style={styles.input}
  onChangeText={props.changetext}
  value={props.choiceValue}
  />

  <CheckBox
  center
  checked={props.choiceCorrect}
  onPress={props.changecheck}
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

export default Choice
