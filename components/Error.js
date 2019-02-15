import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

 const Error = (props) =>

      <View style={styles.container}>

      <Text style={{fontSize:16}}>
      Something has gone wrong!
      </Text>

      <View style={{padding:15}}>
      {props.graphQLErrors !== "undefined" &&
        props.graphQLErrors.map(error => <Text key={error.message} style={{color:'red',fontSize:16}}>{error.message}</Text>)}
      </View>

      <View style={{padding:15}}>
      {props.networkError.result.errors !== "undefined" &&
        props.networkError.result.errors.map(error => <Text key={error.message} style={{color:'red',fontSize:16}}>{error.message}</Text>)}
      </View>

      </View>


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:25
  }
})

export default Error
