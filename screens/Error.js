import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ButtonColor from '../components/ButtonColor'

export default class Error extends React.Component {

  render() {

  const { navigation } = this.props;

  const error = JSON.parse(navigation.getParam('error', 'NO-ID'))

  return (

      <View style={styles.container}>
      <Text style={styles.messages}>
      Something has gone wrong!
      </Text>
      {
        error.graphQLErrors.map((err,i) =>
        <Text key={i} style={styles.messages}>{err.message}</Text>
      )
      }

      <ButtonColor
      title="Back"
      backgroundcolor="#282828"
      onpress={() => this.props.navigation.navigate('SignIn')}
      />
      </View>
    )

    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4f1fe',
  },
  messages: {
    padding:50,
    fontSize:24,
    textAlign:'center'
  },
})
