import React from "react";
import {shallow, mount} from "enzyme";
import configureMockStore from "redux-mock-store";
import '../../test-config';
import Content from "../../components/Content/Course/Content";
import {Provider} from 'react-redux';
import ProfCourseCard from "../../components/Card/ProfCourseCard";
import StudentCourseCard from "../../components/Card/StudentCourseCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import ErrorMessage from "../../components/Error/ErrorMessage";

const mockStore = configureMockStore();
describe("CourseContent component", () =>{
    let initialState;
    let page;
    let store;

    it("Matches snapshot", () =>{
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
        expect(page.html()).toMatchSnapshot();
    })
    it('does not renders card', () =>{
        initialState={
            courses:[]
        }
        store = mockStore(initialState);
        page = mount(<Provider store={store}><Content/></Provider>)
        var profCard = page.find(ProfCourseCard)
        var studCard = page.find(StudentCourseCard)
        expect(profCard).toHaveLength(0)
        expect(studCard).toHaveLength(0)
    })
    it("renders faculty Card", () =>{
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
              }],
              role:"faculty"
        }
        store = mockStore(initialState);
        page = mount(<Provider store={store}><Content/></Provider>)
        var profCard = page.find(ProfCourseCard)
        var studCard = page.find(StudentCourseCard)
        expect(profCard).toHaveLength(1)
        expect(studCard).toHaveLength(0)
    })
    it("renders student Card", () =>{
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
              }],
              role:"student"
        }
        store = mockStore(initialState);
        page = mount(<Provider store={store}><Content/></Provider>)
        var profCard = page.find(ProfCourseCard)
        var studCard = page.find(StudentCourseCard)
        expect(profCard).toHaveLength(0)
        expect(studCard).toHaveLength(1)
    })
    it("renders nothing after search", () =>{
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
              }],
              role:"student"
        }
        store = mockStore(initialState);
        page = mount(<Provider store={store}><Content/></Provider>)
        expect(page.find(StudentCourseCard)).toHaveLength(1)
        var searchBarInput = page.find(SearchBar).find("input")
        searchBarInput.simulate("change", {target:{value:"xzy"}})
        page.update()
        expect(page.find(StudentCourseCard)).toHaveLength(0)
    })
    it("renders specific card after search", () =>{
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
              },
              {
                "courseId": "5db492c349a67b33b8d0a2a2",
                "courseName": "Chemistry I",
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
              }],
              role:"student"
        }
        store = mockStore(initialState);
        page = mount(<Provider store={store}><Content/></Provider>)
        expect(page.find(StudentCourseCard)).toHaveLength(2)
        var searchBarInput = page.find(SearchBar).find("input")
        searchBarInput.simulate("change", {target:{value:"Calcu"}})
        page.update()
        var targetStudentCard = page.find(StudentCourseCard)
        expect(targetStudentCard).toHaveLength(1)

        searchBarInput = page.find(SearchBar).find("input")
        searchBarInput.simulate("change", {target:{value:""}})
        page.update()
        expect(page.find(StudentCourseCard)).toHaveLength(2)
    })
    it("displays error message", () =>{
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
              }],
              role:"student",
              error:{message:'error'}
        }
        store = mockStore(initialState);
        page = mount(<Provider store={store}><Content/></Provider>)
        expect(page.find(ErrorMessage)).toHaveLength(1)
    })
})