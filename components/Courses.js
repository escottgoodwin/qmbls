import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';

const Courses = (props) =>
  <View style={{height: 250}}>

    <FlatList
    data={props.classes}
    renderItem={
      ({ item, index }) => (
        <TouchableOpacity style={styles.touch}
        onPress={() => props.navigation.navigate('CourseDashboard', { courseId: item.id })}
        >
        <Text style={styles.course} >{item.name} - {item.institution.name} </Text>
        </TouchableOpacity>
      )
    }
    keyExtractor={item => item.id}
  />

  </View>

const styles = StyleSheet.create({
  course: {
    textAlign:"center",
    fontSize:20,
    margin:10,
    color:'#282828'
  },
  touch: {
    width: 300,
    margin:5,
    backgroundColor:"white",
    borderColor:"#e4fef1",
    borderRadius:5,
    padding:3
  },
  header:{
    textAlign:"center",
    fontSize: 20,
    margin: 10}
});

Courses.propTypes = {
  classes: PropTypes.array.isRequired,
};

export default Courses
