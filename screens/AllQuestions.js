import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { Button, Card } from 'react-native-elements'

import ButtonColor from '../components/ButtonColor'
import QAList from '../components/QAList'


export default class AllQuestions extends React.Component {

  static navigationOptions = {
    title: 'All Questions',
  };

  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      all_questions :[],
      test_id:'',
      test_number:'',
      coursename:''
    };
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            {this.state.coursename} - {this.state.test_number}
          </Text>

          <ButtonColor
          title="Answer Random Question"
          backgroundcolor="#003366"
          onpress={() => this.props.navigation.navigate("AnswerQuestion",{'test_cycle_id':this.state.test_id})}
          />

          <QAList
          qa_list={this.state.all_questions}
          navigation={this.props.navigation}
          />

          <ButtonColor
          title="Dashboard"
          backgroundcolor="#003366"
          onpress={() => this.props.navigation.navigate("Dashboard")}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4f1fe',
  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 32,
    width: 120,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize:18
  },
});
