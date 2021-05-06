import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, SafeAreaView} from 'react-native';
import CourseList from "../components/CourseList";
import CourseEditScreen from "./CourseEditScreen";
import UserContext from "../UserContext";
import { firebase } from "../firebase";

const ScheduleScreen = ({navigation}) => {
  const [schedule, setSchedule] = useState({ title: '', courses: [] });
  const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';

  const user = useContext(UserContext);
  const canEdit = user && user.role === 'admin';
  const view = (course) => {
    navigation.navigate(canEdit ? 'CourseEditScreen' : 'CourseDetailScreen', { course });
  };



  const fixCourses = json => ({
    ...json,
    courses: Object.values(json.courses)
  });
  
  useEffect(() => {
    const db = firebase.database().ref();
    db.on('value', snap => {
      if (snap.val()) setSchedule(fixCourses(snap.val()))    ;
    }, error => console.log(error));
    return () => { db.off('value', handleData); };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} view={view} />
    </SafeAreaView>
  );
}

const Banner = ({title}) => (
  <Text style={styles.bannerStyle}>{title || "[loading...]"}</Text>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  banner: {
    color: '#888',
    fontSize: 32,
  },

});

export default ScheduleScreen;