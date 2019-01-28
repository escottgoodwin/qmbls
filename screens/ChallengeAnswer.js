import React from 'react';
import { StyleSheet, Platform, FlatList, Image, Text, View, ScrollView,TextInput,Alert} from 'react-native';
import { Button,Card } from 'react-native-elements'

import DisputeQuestion from '../components/DisputeQuestion'
import ButtonColor from '../components/ButtonColor'

export default class ChallengeAnswer extends React.Component {

  static navigationOptions = {
    title: 'Challenge Answer'
  };

  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      qid:'',
      class_id:'',
      student_id:'',
      class_name:'',
      question:'',
      pageurl:'http://1t8r984d8wic2jedckksuin1.wpengine.netdna-cdn.com/wp-content/uploads/2014/09/loading.gif',
      choices:[],
      correct:'',
      response:'',
      challenge:'',
      selected:'',
      color:'',
    };
  }


  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>

        <DisputeQuestion
        title="Question"
        question={this.state.question}
        choices={this.state.choices}
        correct={this.state.correct}
        />

        <Image key={this.state.pageurl} source={{uri: this.state.pageurl}} style={[styles.logo]}/>

        <TextInput
          placeholder='Challenge Question'
          style={{height: 80,width: 320, backgroundColor:'white',borderRadius: 10,borderColor: 'darkgrey',margin:5,padding:10}}
          onChangeText={(text) => this.setState({challenge:text})}
          multiline={true}
          numberOfLines={4}
          value={this.state.challenge}
         />

         <ButtonColor
         title="Challenge Question"
         backgroundcolor="#900000"
         onpress={this.createChallenge}
         />

         <ButtonColor
         title="Cancel"
         backgroundcolor="#282828"
         onpress={() => this.props.navigation.navigate('Dashboard')}
         />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 200,
    marginBottom: 16,
    marginTop: 32,
    width: 320,
  },
  input:{
    height: 40,
    width: 300,
    backgroundColor:'white',
    borderRadius: 5,
    borderColor: 'darkgrey',
    margin:5,
    padding:10
  }
});
