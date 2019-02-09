import React,{Component} from 'react';
import { StyleSheet, Platform, FlatList, Image, Text, View, ScrollView,TextInput,Alert} from 'react-native';
import { Button,Card } from 'react-native-elements'
const moment = require('moment')

import ChallengeMessageRow from './ChallengeMessageRow'

export default class ChallengeMessageList extends Component {


render() {

return (
  <View>
    <FlatList
    data={this.props}
    renderItem={
      ({ item, index }) => (

        <View >
        <Text>{item.challengeMessage}</Text>
          <Text>{item.addedBy.firstName} {item.addedBy.lastName} {moment(item.addedDate).calendar()}</Text>
        </View>
      )
    }
    keyExtractor={item => item.id}
  />

  </View>

)
}
}
