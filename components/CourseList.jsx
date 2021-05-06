import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import Course from "./Course";
import TermSelector from "./TermSelector";
import CourseSelector from "./CourseSelector";
const termMap = { F: 'Fall', W: 'Winter', S: 'Spring'};
const terms = Object.values(termMap);

const getCourseTerm = course => (
  termMap[course.id.charAt(0)]
);
const CourseList = ({courses, view}) => {
  const [selectedTerm, setSelectedTerm] = useState('Spring');
  const termCourses = courses.filter((course) => selectedTerm === getCourseTerm(course));

  return (
  <ScrollView >
      <TermSelector terms={terms} selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm}/>
      <CourseSelector courses={termCourses} view={view}/>
    </ScrollView>
  )
}



export default CourseList;
