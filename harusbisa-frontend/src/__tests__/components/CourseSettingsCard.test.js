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
        component = mount(
        <Provider store={store}>
            <CourseSettingsCard id={initialState.courses[0]._id}/>
        </Provider>)
    })

    it("Matches snapshot", () =>{
        expect(component.html()).toMatchSnapshot();
    })
})