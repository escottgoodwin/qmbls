import React from 'react';
import { StyleSheet, Platform,Image, Text, View, ScrollView,TextInput,Alert,FlatList,TouchableOpacity,Dimensions} from 'react-native';
import { Button,Card } from 'react-native-elements'

import ButtonColor from '../components/ButtonColor'
import Answer from '../components/Answer'

export default class AnswerQuestion extends React.Component {

  static navigationOptions = {
    title: 'Answer Question',
  };

  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      qid:'',
      name:'',
      class_id:'',
      class_name:'',
      question:'',
      pageurl:'http://1t8r984d8wic2jedckksuin1.wpengine.netdna-cdn.com/wp-content/uploads/2014/09/loading.gif',
      choices:[],
      correct:'',
      response:'',
      selected:'',
      color:'',
      answered:false,
      disabled:false,
      dispute:false
    };
  }

  answerSample = () =>
    console.log('pressed')


  render() {
    var selectiontext = "Your Selection: " + this.state.selected;
    var disabled = this.state.disabled
    const qid=this.state.qid
    return (
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.header}>
        {this.state.class_name}
        </Text>

          <Card title={selectiontext} containerStyle={styles.card} >

          <Text style={styles.question}>
          {this.state.question}
          </Text>

          <FlatList
          data={this.state.choices}
          renderItem={
            ({ item, index }) => (
              <TouchableOpacity disabled={disabled}
              onPress={() => this.setState({selected:item.value})}>
               <Text style={styles.choice} >{item.value} {item.text} </Text>
              </TouchableOpacity>
            )
          }
          keyExtractor={item => item.text}
        />
          </Card>

          <View style={styles.answer}>

          {this.state.answered ?
            <View>
            <Answer
            response={this.state.response}
            color={this.state.color}
            correct={this.state.correct} />

            <ButtonColor
            title="Get Answer"
            backgroundcolor="#900000"
            onpress={() => this.props.navigation.navigate('GetAnswer',{qid: qid,})}
            />
            </View>
            :
            <ButtonColor
            title="Submit Answer"
            backgroundcolor="#003366"
            onpress={this.answerSample}
            />
          }

          </View>

          <ButtonColor
          title="Dashboard"
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
    backgroundColor: '#e4f1fe',
  },
  card:{
    height: 320,
    width: Dimensions.get('window').width * .8
  },
  choice:{
    width: 250,
    fontSize:18,
    margin:10,
    color:'#282828'
  },
  question:{
    width: 250,
    fontWeight:'bold',
    fontSize:18,
    color:'#282828'
  },
  answer:{
  justifyContent: 'center',
  alignItems: 'center',
  width: 300,
  height:175,
  },
  header:{
    width: 300,
    fontSize:18,
    textAlign:'center',
    color:'#003366',
    margin:5
  }
});
