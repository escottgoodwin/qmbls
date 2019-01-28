import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet,Text, View} from 'react-native';
import { Button,Card } from 'react-native-elements'

const Answer = (props) =>

    <View style={styles.container} >
    <Text style={{
      fontWeight:'bold',
      fontSize:18,
      margin:10,
      color:[props.color]
    }}>
    {props.response}
    </Text>
    <Text style={styles.answer2}>
    The correct answer was {props.correct}!
    </Text>
    </View>

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  answer2:{
    fontWeight:'bold',
    margin:10,
    fontSize:18,
    color:'#282828'
  }
});

Answer.propTypes = {
  color: PropTypes.string.isRequired,
  response:PropTypes.string.isRequired,
  correct:PropTypes.string.isRequired,
};

export default Answer
