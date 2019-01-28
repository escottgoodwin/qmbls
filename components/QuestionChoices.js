import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Platform, Image, Text, View, ScrollView,TextInput,Alert} from 'react-native';
import { Button } from 'react-native-elements'

const QuestionChoices =(props) =>

<View style={styles.container}>

<TextInput
  placeholder='Question'
  style={styles.question}
  onChangeText={(text) => this.setState({question:text})}
  multiline={true}
  numberOfLines={4}
  value={props.question}
 />

 <View style={styles.choices}>
  <Text style={styles.choicetext}>A</Text>
 <TextInput placeholder='Choice 1' style={styles.input}
  onChangeText={(text) => this.setState({choice1:text})}
  value={props.choice1}
  />
  </View>

  <View style={styles.choices}>
  <Text style={styles.choicetext} >B</Text>
  <TextInput placeholder='Choice 2' style={styles.input}
   onChangeText={(text) => this.setState({choice2:text})}
   value={props.choice2}
   />
   </View>

   <View style={styles.choices}>
   <Text style={styles.choicetext}>C</Text>
   <TextInput placeholder='Choice 3' style={styles.input}
    onChangeText={(text) => this.setState({choice3:text})}
    value={props.choice3}
    />
    </View>

    <View style={styles.choices}>
    <Text style={styles.choicetext}>D</Text>
    <TextInput placeholder='Choice 4' style={styles.input}
     onChangeText={(text) => this.setState({choice4:text})}
     value={props.choice4}
     />
     </View>

     <View style={styles.choices}>
     <Text style={styles.choicetext}>Correct Answer</Text>
     <TextInput placeholder='A,B,C,D' style={styles.answer}
      onChangeText={(text) => this.setState({correct:text})}
      value={props.correct}
      />
      </View>

    </View>

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e4f1fe',
      },
      choices:{
        flexDirection:"row",
        justifyContent: 'center',
        alignItems: 'center',
      },
      choicetext:{
        fontWeight:'bold',
        fontSize:18,
        color:'#484848'
      },
      input:{
        height: 40,
        width: 300,
        backgroundColor:'white',
        borderRadius: 5,
        borderColor: 'darkgrey',
        margin:5,
        padding:10
      },
      answer:{
        height: 40,
        width: 75,
        backgroundColor:'white',
        borderRadius: 5,
        borderColor: 'darkgrey',
        margin:5,
        padding:10
      },
      question:{height: 80,
        width: 350,
        backgroundColor:'white',
        borderRadius: 10,
        borderColor: 'darkgrey',
        margin:5,
        padding:10},
    });

QuestionChoices.propTypes = {
  question: PropTypes.string.isRequired,
  choice1: PropTypes.string.isRequired,
  choice2: PropTypes.string.isRequired,
  choice3: PropTypes.string.isRequired,
  choice4: PropTypes.string.isRequired,
  correct: PropTypes.string.isRequired
};

export default QuestionChoices
