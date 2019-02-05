import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

 const Error = (props) => {

      <View style={styles.container}>
      <Text>
      Something has gone wrong!
      </Text>
      {
        props.graphQLErrors.map(message =>
        <Text>{message}</Text>
      )
      }
      </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Error
