import React from "react";
import {mount} from "enzyme";
import configureMockStore from "redux-mock-store";
import '../../test-config';
import {Provider} from "react-redux";
import CourseSettingsCard from "../../components/Card/CourseSettingsCard";

const mockStore = configureMockStore();
describe("CourseSettingsCard component", () =>{
    let initialState;
    let component;
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
        component = mount(
        <Provider store={store}>
            <CourseSettingsCard id={initialState.courses[0].courseId}/>
        </Provider>)
    })

    it("Matches snapshot", () =>{
        expect(component.html()).toMatchSnapshot();
    })
})