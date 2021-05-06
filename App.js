import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScheduleScreen from "./screens/ScheduleScreen";
import CourseDetailScreen from "./screens/CourseDetailScreen";
import CourseEditScreen from "./screens/CourseEditScreen";
import UserContext from './UserContext';
import { firebase } from "./firebase";

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState({role: "admin"});
  const db = firebase.database().ref("posts/archived");

  const fixCourses = json => ({
    ...json,
    courses: Object.values(json.courses)
  });

  useEffect(() => {
    const db = firebase.database().ref();
    db.on('value', snap => {
      if (snap.val()) setSchedule(fixCourses(snap.val()))    ;
    }, error => console.log(error));
    
  }, []);

  return (
    <UserContext.Provider value={user}>
    <NavigationContainer>
      <Stack.Navigator> 
      <Stack.Screen name="ScheduleScreen"
          component={ScheduleScreen}
          options={{ title: 'Schedule'}} 
        />
        <Stack.Screen name="CourseDetailScreen"
          component={CourseDetailScreen}
          options={{ title: 'Course detail'}} 
        />
        <Stack.Screen name="CourseEditScreen"
              component={CourseEditScreen}
              options={{ title: 'Course Editor'}} 
        />
      </Stack.Navigator>
    </NavigationContainer>
    </UserContext.Provider>
  );
};


export default App;
