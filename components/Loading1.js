import React from 'react'
import { View,StyleSheet,Text } from 'react-native'
import ContentLoader from 'rn-content-loader';
import { Constants, Svg } from 'expo';

const Loading1 = () => (

      <View style={styles.container}>
      <ContentLoader height={300}>

  <Svg.Rect x="75" y="13" rx="4" ry="4" width="100" height="13" />
  <Svg.Rect x="75" y="37" rx="4" ry="4" width="50" height="8" />
  <Svg.Rect x="0" y="70" rx="5" ry="5" width="400" height="200" />
</ContentLoader>
      </View>

    )

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4f1fe',
    padding:25,

  }
})

export default Loading1
