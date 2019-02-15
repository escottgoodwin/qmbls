import React from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat'
import { StyleSheet, Text, View, TouchableOpacity, FlatList,Dimensions} from 'react-native';
import { Button, Card } from 'react-native-elements'

const TestList = (props) =>

<FlatList
data={props.tests}
renderItem={
  ({ item, index }) => (
    <TouchableOpacity style={{margin:10}}
    onPress={() => props.navigation.navigate('TestDashboard',{testId: item.id})}>
    <Card title={item.testNumber} containerStyle={styles.card}>
    <Text style={styles.instructions}>{item.subject} </Text>
    <Text style={styles.instructions}>{ dateFormat(item.testDate, "dddd, mmmm dS, yyyy") }</Text>
    </Card >
    </TouchableOpacity>
  )
}
keyExtractor={item => item.id}
/>

const styles = StyleSheet.create({
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize:18
  }
});

TestList.propTypes = {
  tests: PropTypes.array.isRequired,
};

export default TestList
