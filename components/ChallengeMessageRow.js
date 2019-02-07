import React from 'react';
import { StyleSheet, Platform, FlatList, Image, Text, View, ScrollView,TextInput,Alert} from 'react-native';
import { Button,Card } from 'react-native-elements'
const moment = require('moment')

const ChallengeMessageRow = (props) =>

    <View >
      <Text>{props.addedBy.firstName} {props.addedBy.lastName}</Text>
      <Text>
        <div>{moment(props.addedDate).calendar()}</div>
      </Text>
      <Text><div >{props.challengeMessage}</div></Text>

    </View>

export default ChallengeMessageRow
