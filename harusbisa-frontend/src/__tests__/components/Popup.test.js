import React from "react";
import {mount} from "enzyme";
import '../../test-config';
import Popup from "../../components/Popup/Popup";
import { Button, Dialog } from "@material-ui/core";
import CourseForm from "../../components/Form/CourseForm";
import configureMockStore from "redux-mock-store";
import {Provider} from "react-redux";
const mockStore = configureMockStore();
describe("Popup component", () =>{
    let wrapper;
    beforeEach(() =>{
        let store = mockStore();
        wrapper = mount(
        <Provider store={store}><Popup/></Provider> )
    })

    it("Matches snapshot", () =>{        
        expect(wrapper.html()).toMatchSnapshot();
    })

    it("opens dialog", () =>{
        var trigger = wrapper.find(Button)
        var dialog = wrapper.find(Dialog)
        var content = wrapper.find(CourseForm)

        expect(trigger).toBeDefined()
        expect(dialog).toBeDefined()
        expect(content).toBeDefined()
        

        trigger.simulate('click')
        expect(wrapper.find(Dialog)).toBeDefined()
        expect(wrapper.find(CourseForm)).toBeDefined()
        expect(wrapper.find(Dialog).props().open).toBeTruthy()
    })
})