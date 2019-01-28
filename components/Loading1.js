import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Placeholder from 'rn-placeholder';

export default class Loading1 extends React.Component {

  state = {
    isReady:false
  }

  render() {
    return (
      <View style={styles.container}>
      <Placeholder.ImageContent
          size={60}
          animate="fade"
          lineNumber={4}
          lineSpacing={5}
          lastLineWidth="30%"
          onReady={this.state.isReady}
        >
          <Text></Text>
        </Placeholder.ImageContent>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
