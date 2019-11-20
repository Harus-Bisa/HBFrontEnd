import React from "react";
import {mount} from "enzyme";
import configureMockStore from "redux-mock-store";
import '../../test-config';
import {Provider} from 'react-redux';
import AccountSettingsForm from "../../components/Form/Settings/AccountSettingsForm";

const mockStore = configureMockStore();
describe("AccountSettingsForm component", () =>{
    let initialState;
    let component;
    let store;
    beforeEach(() =>{
        initialState = {
              loading: false
        }
        store = mockStore(initialState);
        component = mount(<Provider store={store}><AccountSettingsForm/></Provider>)
    })

    it("Matches snapshot", () =>{
        expect(component.html()).toMatchSnapshot();
    })
})