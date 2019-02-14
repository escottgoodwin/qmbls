import React from 'react'
import { View,StyleSheet } from 'react-native'
import ContentLoader from 'rn-content-loader';
import { Constants, Svg } from 'expo';

const TestLoader = () => (

  <View style={styles.container}>
  <ContentLoader height={600}>

  <Svg.Rect x="50" y="25" rx="4" ry="4" width="200" height="25" />

  <Svg.Rect x="50" y="65" rx="4" ry="4" width="200" height="25" />

  <Svg.Rect x="25" y="100" rx="0" ry="0" width="250" height="150" />

  <Svg.Rect x="25" y="270" rx="0" ry="0" width="250" height="150" />

  <Svg.Rect x="25" y="490" rx="25" ry="25" width="270" height="45" />

  <Svg.Rect x="25" y="550" rx="25" ry="25" width="270" height="45" />

  </ContentLoader>
    </View>
  )





const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4f1fe',
    padding:25,

  }
})

export default TestLoader
