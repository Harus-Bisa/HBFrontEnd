import React from "react";
import {shallow, mount} from "enzyme";
import configureMockStore from "redux-mock-store";
import '../../test-config';
import {Provider} from 'react-redux';
import Home from "../../components/Content/Dashboard/Home";
const mockStore = configureMockStore();
describe("Course Home component", () =>{
    it("matches snapshot", () =>{
        let initialState = {
            course:{
                "_id": "5db492c349a67b33b8d0a2a2",
                "course_name": "Calculus I",
                "course_description": "The basic of calculus (derivatives).",
                "start_term": "August 2019",
                "end_term": "December 2019",
                "number_of_lectures": 5,
                "instructor": "John Doe"
              }
        }
        let store = mockStore(initialState);
        let component = shallow(<Provider store={store}><Home/></Provider>)
        expect(component.html()).toMatchSnapshot()
    })
})