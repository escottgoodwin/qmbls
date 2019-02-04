import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions,  } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Icon, Divider } from 'react-native-elements'

const ReviewChoice = (props) =>

<View style={styles.choice}>
  <View style={styles.choice}>
  {props.correct ?
    <Icon
      name='check-square'
      type='font-awesome'
      color='#4AC948'
       />
       :
       <Icon
         name='times-circle'
         type='font-awesome'
         color='#ff0000'
          />
  }

  <Text style={{padding:10}} >
    {props.choice}
  </Text>

  </View>
  <Divider />
  </View>

const styles = StyleSheet.create({
  choice:{
    flexDirection:"row",
    minHeight: 50,
    alignItems: 'center',
    backgroundColor:'white',
    width: 300,
    padding:10
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

export default ReviewChoice
