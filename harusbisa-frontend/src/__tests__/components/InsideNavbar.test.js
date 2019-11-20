import React from "react";
import InsideNavbar from "../../components/Navbar/InsideNavbar";
import {Provider} from "react-redux";
import {mount} from "enzyme";
import configureMockStore from "redux-mock-store";
import '../../test-config';
import {BrowserRouter as Router} from "react-router-dom";
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
describe("InsideNavbar component", () =>{
    let initialState;
    let insideNavbar;
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
              }],
            loading: false
        }
        store = mockStore(initialState);
        store.dispatch = jest.fn()
        insideNavbar = mount(<Router><Provider store={store}><InsideNavbar/></Provider></Router>)
    })

    it("Matches snapshot", () =>{
        expect(insideNavbar.html()).toMatchSnapshot();
    })
    
    it("Renders the small navbar log off button", () =>{
        var smallLogoffButton = insideNavbar.find("#small-logoff").at(0);
        expect(store.dispatch).not.toHaveBeenCalled()
        smallLogoffButton.simulate('click')
        expect(store.dispatch).toHaveBeenCalled()
        expect(store.dispatch).toHaveBeenCalledTimes(1)
       
    })

    it("Renders the big navbar log off button", () =>{
        var bigLogoffButton = insideNavbar.find("#big-logoff").at(0);
        expect(store.dispatch).not.toHaveBeenCalled()
        bigLogoffButton.simulate('click')
        expect(store.dispatch).toHaveBeenCalled()
        expect(store.dispatch).toHaveBeenCalledTimes(1)
       
    })

})