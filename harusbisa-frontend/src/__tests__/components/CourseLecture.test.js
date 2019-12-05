import React from "react";
import {shallow, mount} from "enzyme";
import configureMockStore from "redux-mock-store";
import '../../test-config';
import {Provider} from 'react-redux';
import Lecture from "../../components/Content/Dashboard/Lecture";
const mockStore = configureMockStore();

describe("Course Lecture component", () =>{
    it("matches snapshot", () =>{
        let initialState = {
            selectedLecture: {
                date: 1574897055773,
                quizzes:[{
                    "question": "1 + 1 = ?",
                    "answerOptions": ["4","2","0"]
                }]
            },
            course:{
                courseName:'abc'
            }
        }
        let store = mockStore(initialState);
        let component = shallow(<Provider store={store}><Lecture/></Provider>)
        expect(component.html()).toMatchSnapshot()
    })
})