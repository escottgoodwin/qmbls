import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import { Button,Card } from 'react-native-elements'

const Question = (props) =>

<Card title={selectiontext} containerStyle={{height: 320}} >

<Text style={{width: 250,fontWeight:'bold',fontSize:18,color:'#282828'}}>
{props.question}
</Text>

<FlatList
data={props.choices}
renderItem={
  ({ item, index }) => (
    <TouchableOpacity
    onPress={() => this.setState({selected:item.value})}>
     <Text style={{width: 250,fontSize:18,margin:10,color:'#282828'}} >{item.value} {item.text} </Text>
    </TouchableOpacity>
  )
}
keyExtractor={item => item.text}
/>
</Card>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4f1fe',
    height:600
  },
  question:{
    width: 250,
    fontWeight:'bold',
    fontSize:18,
    color:'#282828'},
  },
});

Question.propTypes = {
  choices: PropTypes.array.isRequired,
};


export default Question
