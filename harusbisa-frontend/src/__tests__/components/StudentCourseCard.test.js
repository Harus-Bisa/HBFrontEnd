import React from "react";
import TestRenderer  from "react-test-renderer";
import StudentCourseCard from "../../components/Card/StudentCourseCard";
import {shallow} from "enzyme";
import configureMockStore from "redux-mock-store";
import '../../test-config';

const mockStore = configureMockStore();
describe("StudentCourseCard component", () =>{
    let initialState;
    let studentCourseCard;
    let store;
    beforeEach(() =>{
        initialState = {
            courses:[{
                "_id": "5db492c349a67b33b8d0a2a2",
                "course_name": "Calculus I",
                "course_description": "The basic of calculus (derivatives).",
                "start_term": "August 2019",
                "end_term": "December 2019",
                "number_of_lectures": 5,
                "instructor": "John Doe"
              }]
        }
        store = mockStore(initialState);
        studentCourseCard = shallow(<StudentCourseCard store={store} id={initialState.courses[0]._id}/>)
    })

    it("Matches snapshot", () =>{
        expect(studentCourseCard.html()).toMatchSnapshot();
    })

    it("receives proper props", () =>{
        let props = studentCourseCard.props().children.props
        expect(props.id).toBe(initialState.courses[0]._id)
        expect(props.course).toBe(initialState.courses[0])
    })
})