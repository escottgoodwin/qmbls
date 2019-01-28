import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView,TextInput, Alert} from 'react-native';


const CreateQuestionForm = () => {

<Text>
{questionToRender.test.course.name} - {questionToRender.test.course.institution.name}
</Text>

<Text>
{questionToRender.test.subject} - {questionToRender.test.testNumber}
</Text>

<Image key={questionToRender.sentPanel.link} source={{uri: questionToRender.sentPanel.link }} style={styles.logo} />
<Text style={styles.welcome}>
  Check correct Answers
</Text>

<TextInput
  placeholder='Question'
  style={styles.question}
  onChangeText={(text) => this.setState({question:text})}
  multiline={true}
  numberOfLines={4}
  value={this.state.question}
 />

 <Choice
 changetext={(text) => this.setState({choice1:text})}
 changecheck={(check) => this.setState({choiceCorrect1:check})}
 choiceValue={this.state.choice1}
 choiceCorrect={this.state.choiceCorrect1}
 placeholder='Choice 1'
 />

 <Choice
 changetext={(text) => this.setState({choice2:text})}
 changecheck={(check) => this.setState({choiceCorrect2:check})}
 choiceValue={this.state.choice2}
 choiceCorrect={this.state.choiceCorrect2}
 placeholder='Choice 2'
 />

 <Choice
 changetext={(text) => this.setState({choice3:text})}
 changecheck={(check) => this.setState({choiceCorrect3:check})}
 choiceValue={this.state.choice3}
 choiceCorrect={this.state.choiceCorrect3}
 placeholder='Choice 3'
 />

 <Choice
 changetext={(text) => this.setState({choice4:text})}
 changecheck={(check) => this.setState({choiceCorrect4:check})}
 choiceValue={this.state.choice4}
 choiceCorrect={this.state.choiceCorrect4}
 placeholder='Choice 4'
 />

}

export default CreateQuestionForm
