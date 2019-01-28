import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements'

const QAList = (props) =>
  <FlatList
  data={props.qa_list}
  renderItem={
    ({ item, index }) => (
      <TouchableOpacity
      onPress={() => props.navigation.navigate('GetAnswer',{class_id:item.question.class_id,coursename:item.question.name,qid:item.qid })}>

      <View style={styles.touch}>

       <Text style={styles.course} >
       {item.question.question}
       </Text>

       {item.question.answercorrect ?
       <Icon
       name='check-circle'
       type='font-awesome'
       color='green'
       />
       :
       <Icon
       name='times-circle'
       type='font-awesome'
       color='red'
       />
      }

      </View>

      </TouchableOpacity>

    )
  }
  keyExtractor={item => item.question.question}
  />

const styles = StyleSheet.create({
  course: {
    width: 200,
    textAlign:"center",
    fontSize:16,
    margin:5,
    color:'#282828'
  },
  touch: {
    width: 300,
    borderRadius:5,
    padding:2,
    margin:5,
    height:100,
    backgroundColor:"white",
    borderColor:"#87CEEB",
    flexDirection:"row",
    justifyContent: 'center',
    alignItems: 'center'
  },
});

QAList.propTypes = {
  qa_list: PropTypes.array.isRequired,
};

export default QAList
