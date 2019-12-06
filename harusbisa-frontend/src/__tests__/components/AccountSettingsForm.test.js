import React from "react";
import {mount} from "enzyme";
import configureMockStore from "redux-mock-store";
import '../../test-config';
import {Provider} from 'react-redux';
import AccountSettingsForm from "../../components/Form/Settings/AccountSettingsForm";
import { Form } from "reactstrap";
import thunk from "redux-thunk";

const mockStore = configureMockStore([thunk]);
describe("AccountSettingsForm component", () =>{
    let initialState;
    let component;
    let store;
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState])

    beforeEach(() =>{
        initialState = {
            loading: false,
            userId: "5db6093a7f75df3ce6c12095",
            firstName: "Wilson",
            lastName: "Burnawan",
            email: "wilson.burnawan@gmail.com",
            school: "University of Illinois at Urbana-Champaign",
            role: "faculty"
        }
        store = mockStore(initialState);
        store.dispatch = jest.fn()
        component = mount(<Provider store={store}><AccountSettingsForm/></Provider>)
    })
    
    afterEach(()=>{
        jest.clearAllMocks();
    })
    it("Matches snapshot", () =>{
        expect(component.html()).toMatchSnapshot();
    })
    it("Change state with form entry", () =>{
        const ids = ["firstName", "lastName", "school", "email", "oldPassword", "newPassword", "verifyNewPassword"];
        
        ids.forEach(id =>{
            var formEntry = component.find("#"+id).at(0)
            expect(setState).not.toHaveBeenCalled()
            formEntry.simulate("change")
            expect(setState).toHaveBeenCalledTimes(1)
            jest.clearAllMocks()
        })
    })
    it("Simulate submit", () =>{
        const mockPreventDefault = jest.fn();
        const formIds = ["profile-form","password-form"];

        formIds.forEach(id =>{
            var form = component.find("#"+id).at(0)
            expect(mockPreventDefault).not.toHaveBeenCalled()
            if (id === "password-form"){
                let passwordIds = ["oldPassword", "newPassword", "verifyNewPassword"]
                passwordIds.forEach(id =>{
                    var formEntry = component.find("#"+id).at(0)
                    formEntry.simulate("change",{target:{value:"pass"}})
                    component.update()
                })
            }
            form.simulate('submit',{preventDefault:mockPreventDefault, target:{id:id}})
            expect(store.dispatch).toHaveBeenCalled()
            expect(mockPreventDefault).toHaveBeenCalled()
            jest.clearAllMocks()
        })
    })
    it("Simulate delete", () =>{
       var deleteButton = component.find("#delete-button").at(0)
        expect(store.dispatch).not.toHaveBeenCalled();
        deleteButton.simulate("click")
        expect(store.dispatch).toHaveBeenCalled();
    })

    it("Simulate loading", () =>{
        initialState = {
            loading: true
        }
        store = mockStore(initialState);
        component = mount(<Provider store={store}><AccountSettingsForm /></Provider>)
        var loading = component.find(<p>Loading</p>)
        expect(loading).toBeDefined();
    })
})