import React from 'react';
import { IProps } from './CourseList.model';
import { Courses } from './CourseList.styled';
import CourseElement from './CourseElement';

const CourseList = ({ courses, ...props }: IProps): JSX.Element => {
  return (
    <div {...props}>
      {courses.map((course) => (
        <Courses>
          <CourseElement {...course} tags={course.tags} />
        </Courses>
      ))}
    </div>
  );
};

export default CourseList;
