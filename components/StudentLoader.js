import React from 'react'
import { View,StyleSheet } from 'react-native'
import ContentLoader from 'rn-content-loader';
import { Constants, Svg } from 'expo';

const StudentLoader = () => (


  <View style={styles.container}>
  <ContentLoader height={600}>

  <Svg.Rect x="25" y="50" rx="0" ry="0" width="250" height="112" />

  <Svg.Rect x="75" y="175" rx="4" ry="4" width="150" height="20" />

  <Svg.Rect x="25" y="225" rx="4" ry="4" width="270" height="45" />
  <Svg.Rect x="25" y="275" rx="4" ry="4" width="270" height="45" />
  <Svg.Rect x="25" y="325" rx="4" ry="4" width="270" height="45" />

  <Svg.Rect x="25" y="500" rx="25" ry="25" width="270" height="45" />

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

export default StudentLoader
