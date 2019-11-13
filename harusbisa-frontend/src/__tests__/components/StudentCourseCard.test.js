import React from "react";
import TestRenderer  from "react-test-renderer";
import {StudentCourseCard} from "../../components/Card/StudentCourseCard";

describe("StudentCourseCard component", () =>{
    let props;
    let studentCourseCard;
    let instance;
    beforeEach(() =>{
        props = {
            course: {
                "_id": "5db492c349a67b33b8d0a2a2",
                "course_name": "Calculus I",
                "course_description": "The basic of calculus (derivatives).",
                "start_term": "August 2019",
                "end_term": "December 2019",
                "number_of_lectures": 5,
                "instructors": "John Doe"
              }
        }
        studentCourseCard = TestRenderer.create(<StudentCourseCard course={props.course}/>)
        instance = studentCourseCard.root;
    })

    it("Matches snapshot", () =>{
        expect(studentCourseCard.toJSON()).toMatchSnapshot();
    })

})