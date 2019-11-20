import React from "react";
import {mount} from "enzyme";
import configureMockStore from "redux-mock-store";
import '../../test-config';
import {Provider} from 'react-redux';
import AccountSettingsForm from "../../components/Form/Settings/AccountSettingsForm";
import { Form } from "reactstrap";

const mockStore = configureMockStore();
describe("AccountSettingsForm component", () =>{
    let initialState;
    let component;
    let store;
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState])
    const mockChangeProfile = jest.fn();

    beforeEach(() =>{
        initialState = {
              loading: false
        }
        store = mockStore(initialState);
        component = mount(<Provider store={store}><AccountSettingsForm changeProfile={mockChangeProfile}/></Provider>)
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
            expect(mockChangeProfile).not.toHaveBeenCalled()
            expect(mockPreventDefault).not.toHaveBeenCalled()
            form.simulate('submit',{preventDefault:mockPreventDefault})
            expect(mockChangeProfile).toHaveBeenCalled()
            expect(mockPreventDefault).toHaveBeenCalled()
            jest.clearAllMocks()
        })
    })

    it("Simulate loading", () =>{
        initialState = {
            loading: true
        }
        store = mockStore(initialState);
        component = mount(<Provider store={store}><AccountSettingsForm changeProfile={mockChangeProfile}/></Provider>)
        var loading = component.find(<p>Loading</p>)
        expect(loading).toBeDefined();
    })
})