import React from "react";
import TestRenderer  from "react-test-renderer";
import {shallow} from "enzyme";
import configureMockStore from "redux-mock-store";
import '../../test-config';
import Content from "../../components/Content/Course/Content";
import {Provider} from 'react-redux';

const mockStore = configureMockStore();
describe("CourseContent component", () =>{
    let initialState;
    let page;
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
        page = shallow(<Provider store={store}><Content/></Provider>)
    })

    it("Matches snapshot", () =>{
        expect(page.html()).toMatchSnapshot();
    })
})