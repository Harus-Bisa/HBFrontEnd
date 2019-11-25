import React from "react";
import {mount} from "enzyme";
import configureMockStore from "redux-mock-store";
import '../../test-config';
import {Provider} from 'react-redux';
import CourseForm from "../../components/Form/CourseForm";
import thunk from 'redux-thunk';
import { Button } from "@material-ui/core";
import {Form} from "reactstrap";
import JoinCourseAnnoucement from "../../components/Form/JoinCourseAnnoucement";
const mockStore = configureMockStore([thunk]);

describe("CourseForm component", () =>{
    let component;
    let store;
    let initialState;
    let mockClosePopup = jest.fn()

    afterEach(() =>{
        jest.clearAllMocks();
    })
    it("matches snapshot", () =>{
        store = mockStore(initialState);
        component = mount(<Provider store={store}><CourseForm/></Provider>)
        expect(component.html()).toMatchSnapshot()
    })
    it("renders edit type form", () =>{
        var id = "5db492c349a67b33b8d0a2a2"
        initialState= {
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
        component = mount(<Provider store={store}><CourseForm id={id}/></Provider>)
        var header = component.find("h3")
        expect(header.text()).toBe("Edit Kelas")
    })
    it("renders add type form", () =>{
        store = mockStore(initialState);
        component = mount(<Provider store={store}><CourseForm/></Provider>)
        var header = component.find("h3")
        expect(header.text()).toBe("Tambahkan Kelas Baru")
    })
    it("changes state when form is inputted", () =>{
        let setState = jest.fn();
        let useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, setState])
        store = mockStore(initialState);
        component = mount(<Provider store={store}><CourseForm/></Provider>)
        
        var labels = ["courseName", "startDate", "endDate"]
        labels.forEach(l =>{
            var input = component.find("#"+l).at(0)
            expect(setState).not.toHaveBeenCalled()
            input.simulate("change")
            expect(setState).toHaveBeenCalledTimes(1)
            jest.clearAllMocks()

        })
    })
    it("submits edit", () =>{
        var id = "5db492c349a67b33b8d0a2a2"
        initialState= {
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
        store.dispatch = jest.fn()
        const mockPreventDefault = jest.fn();
        component = mount(<Provider store={store}><CourseForm id={id} closePopup={mockClosePopup}/></Provider>)

        expect(store.dispatch).not.toHaveBeenCalled()
        expect(mockPreventDefault).not.toHaveBeenCalled()
        expect(mockClosePopup).not.toHaveBeenCalled()

        var submitButton = component.find(Button)
        expect(submitButton.text()).toBe("Edit")
        component.find(Form).simulate("submit", {preventDefault:mockPreventDefault})
        expect(store.dispatch).toHaveBeenCalled()
        expect(mockPreventDefault).toHaveBeenCalled()
        expect(mockClosePopup).toHaveBeenCalled()
    })
    it("submits add", () =>{
        initialState= {
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
        store.dispatch = jest.fn()
        const mockPreventDefault = jest.fn();
        component = mount(<Provider store={store}><CourseForm closePopup={mockClosePopup}/></Provider>)

        expect(store.dispatch).not.toHaveBeenCalled()
        expect(mockPreventDefault).not.toHaveBeenCalled()
        
        var labels = ["courseName", "startDate", "endDate"]
        labels.forEach(l =>{
            var input = component.find("#"+l).at(0)
            input.simulate("change", {target:{value:"Calcu"}})
            component.update()
        })
        var submitButton = component.find(Button)
        expect(submitButton.text()).toBe("Tambahkan")
        component.find(Form).simulate("submit", {preventDefault:mockPreventDefault})
        expect(store.dispatch).toHaveBeenCalled()
        expect(mockPreventDefault).toHaveBeenCalled()
        component.update()
        var joinCourseAnnouncement = component.find(<JoinCourseAnnoucement closePopup={mockClosePopup}/>)
        expect(joinCourseAnnouncement).toBeDefined()
    })
})