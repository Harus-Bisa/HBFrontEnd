import React from "react";
import StudentCourseCard from "../../components/Card/StudentCourseCard";
import {mount} from "enzyme";
import configureMockStore from "redux-mock-store";
import '../../test-config';
import {Provider} from "react-redux";

const mockStore = configureMockStore();
describe("StudentCourseCard component", () =>{
    let initialState;
    let studentCourseCard;
    let store;
    beforeEach(() =>{
        initialState = {
            courses:[{
                "courseId": "5db492c349a67b33b8d0a2a2",
                "courseName": "Calculus I",
                "courseDescription": "The basic of calculus (derivatives).",
                "startTerm": "August 2019",
                "endTerm": "December 2019",
                "numberOfLectures": 5,
                "numberOfStudents": 21,
                "instructors": [
                  "John Doe",
                  "Bryan Smith"
                ],
                "joinCode": "123654"
              }]
        }
        store = mockStore(initialState);
        studentCourseCard = mount(
        <Provider store={store}>
            <StudentCourseCard id={initialState.courses[0].courseId}/>
        </Provider>)
    })

    it("Matches snapshot", () =>{
        expect(studentCourseCard.html()).toMatchSnapshot();
    })
})