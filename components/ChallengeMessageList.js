import React,{Component} from 'react';
import { StyleSheet, Platform, FlatList, Image, Text, View, ScrollView,TextInput,Alert} from 'react-native';
import { Button,Card } from 'react-native-elements'

import ChallengeMessageRow from './ChallengeMessageRow'

export default class ChallengeMessageList extends Component {

  messagesEnd = React.createRef()

  componentDidMount() {
    this.scrollToBottom()
    this.props.subscribeToNewChallengeMessage();
  }

  componentDidUpdate () {
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    this.messagesEnd.current.scrollIntoView({ behavior: 'smooth' })
  }

render() {

return (
  <View>
    {this.props.challengeMessages.map(challengeMessage =>
    <ChallengeMessageRow key={challengeMessage.id} {...challengeMessage} />)}
    <div ref={this.messagesEnd} />
  </View>

)
}
}
