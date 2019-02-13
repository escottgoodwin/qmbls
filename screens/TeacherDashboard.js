import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements'
import { Query } from "react-apollo";
import gql from "graphql-tag";

import ButtonColor from '../components/ButtonColor'
import DashboardHeader from '../components/DashboardHeader'
import Courses from '../components/Courses'
import Error from '../components/Error'

const COURSE_QUERY = gql`
query UserQuery($userid: ID!) {
  user(id: $userid){
    id
    firstName
    lastName
    invitesSentTo{
      id
      course{
        id
        courseNumber
        name
        time
        teachers{
          firstName
          lastName
        }
        institution{
          name
        }
      }
    }
    teacherCourses{
      id
      name
      courseNumber
      time
      deleted
      institution{
        name
      }
      teachers{
        firstName
        lastName
      }
      tests{
        id
      }
    }
  }
}
`

const LOGOUT_MUTATION = gql`
  mutation {
    logout{
      authMsg
      user{
        online
        firstName
        lastName
      }
    }
  }
`

class TeacherDashboard extends React.Component {

  static navigationOptions = {
    title: 'Teacher Dashboard',
    headerLeft: null
  };

  render() {
    const user =  AsyncStorage.getItem('user');
    const token = AsyncStorage.getItem('auth_token');
    const fullName = user.firstName + ' ' + user.lastName
    return (
      <ScrollView contentContainerStyle={styles.container}>

          <DashboardHeader
          name={fullName}
          image='../assets/RNFirebase.png'
          />

          <Query query={COURSE_QUERY} variables={{ userid: user.id }}>
                {({ loading, error, data }) => {
                  if (loading) return 'Loading...'
                  if (error) return <Error {...error}/>

                  const userToRender = data.user
                  const teacherCourses = new Array(userToRender.teacherCourses.filter(course => !course.deleted))
                  
                  return (

                    <Courses
                    classes={teacherCourses}
                    navigation={this.props.navigation}
                        />
                      )
                    }}
        </Query>

          <ButtonColor
          title="Create Question"
          backgroundcolor="#003366"
          onpress={() => this.props.navigation.navigate("CreateQuestion")}
          />

          <Mutation
              mutation={LOGOUT_MUTATION}
              variables={{ userId:userid }}
              onCompleted={data => this._confirm(data)}
            >
              {mutation => (
                <ButtonColor
                title="Sign Out"
                backgroundcolor="#282828"
                onpress={mutation}
                />
              )}
            </Mutation>



      </ScrollView>
    );
  }

  _confirm = (data) => {
    const { user, authMsg } = data.logout
    AsyncStorage.multiRemove(['userid','auth_token'])
    this.props.navigation.navigate('Welcome',{ authMsg: authMsg })
    }

  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4f1fe',
  }
});

export default TeacherDashboard
