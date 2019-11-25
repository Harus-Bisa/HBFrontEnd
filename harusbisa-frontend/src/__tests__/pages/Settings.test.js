import React from "react";
import {mount} from "enzyme";
import configureMockStore from "redux-mock-store";
import '../../test-config';
import {Provider} from 'react-redux';
import Settings from "../../pages/Settings/Settings";
import AccountSettingsForm from "../../components/Form/Settings/AccountSettingsForm";
import StudentCourseSettingsForm from "../../components/Form/Settings/StudentCourseSettingsForm";

const mockStore = configureMockStore();
describe("Settings page", () =>{
    let initialState;
    let page;
    let store;
    let history;
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
              }],
              loading: false,
              loggedIn: true,
        }
        history = {
            push: jest.fn()
        }
        localStorage.setItem('id_token', 123);
        store = mockStore(initialState);
        page = mount(<Provider store={store}><Settings history={history}/></Provider>)
    })

    it("Matches snapshot", () =>{
        expect(page.html()).toMatchSnapshot();
    })

    it("renders account form", () =>{
        var accountButton = page.find("#ACCOUNT-button").at(0)
        accountButton.simulate("click")
        page.update()
        var accountForm = page.find(AccountSettingsForm)
        var courseForm = page.find(StudentCourseSettingsForm)
        expect(accountForm).toBeDefined()
        expect(accountForm).toHaveLength(1)
        expect(courseForm).toHaveLength(0) 
    })

    it("renders course form", () =>{
        var courseButton = page.find("#COURSE-button").at(0)
        courseButton.simulate("click")
        page.update()
        var accountForm = page.find(AccountSettingsForm)
        var courseForm = page.find(StudentCourseSettingsForm)
        expect(courseForm).toBeDefined()
        expect(courseForm).toHaveLength(1)
        expect(accountForm).toHaveLength(0) 
    })
})