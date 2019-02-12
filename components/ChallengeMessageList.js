import React from 'react';
import { StyleSheet, Platform, FlatList, Image, Text, View, ScrollView,TextInput,Alert} from 'react-native';
import { Button,Card } from 'react-native-elements'
const moment = require('moment')

import ChallengeMessageRow from './ChallengeMessageRow'

export default class ChallengeMessageList extends React.Component {

  componentDidMount() {
    this.props.subscribeToNewChallengeMessage();
  }

  render() {

    return (
  <View>
  <Text>Messages - {this.props.challengeMessages.length}</Text>

    {this.props.challengeMessages.map(item => <ChallengeMessageRow key={item.id} {...item}/>)}

  </View>
    )
  }
}
