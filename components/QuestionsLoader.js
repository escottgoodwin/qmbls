import React from 'react'
import { View,StyleSheet } from 'react-native'
import ContentLoader from 'rn-content-loader';
import { Constants, Svg } from 'expo';

const QuestionsLoader = () => (

  <View style={styles.container}>
  <ContentLoader height={600}>

  <Svg.Rect x="50" y="35" rx="4" ry="4" width="200" height="30" />

  <Svg.Rect x="50" y="80" rx="4" ry="4" width="200" height="30" />

  <Svg.Rect x="100" y="130" rx="4" ry="4" width="100" height="30" />

  <Svg.Rect x="25" y="175" rx="0" ry="0" width="250" height="40" />

  <Svg.Rect x="25" y="225" rx="0" ry="0" width="250" height="40" />

  <Svg.Rect x="25" y="285" rx="0" ry="0" width="250" height="200" />

  <Svg.Rect x="25" y="505" rx="0" ry="0" width="250" height="200" />



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

export default QuestionsLoader
