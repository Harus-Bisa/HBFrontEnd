import React from "react";
import TestRenderer  from "react-test-renderer";
import {shallow} from "enzyme";
import '../../test-config';
import Popup from "../../components/Popup/Popup";
import { Button, Dialog } from "@material-ui/core";
import CourseForm from "../../components/Form/CourseForm";

describe("StudentCourseCard component", () =>{

    it("Matches snapshot", () =>{
        let testRenderer = TestRenderer.create(<Popup/>)
        expect(testRenderer.toJSON()).toMatchSnapshot();
    })

    it("opens dialog", () =>{
        let wrapper = shallow(<Popup/>)
        var trigger = wrapper.find(Button)
        var dialog = wrapper.find(Dialog)
        var content = wrapper.find(CourseForm)

        expect(trigger).toBeDefined()
        expect(dialog).toBeDefined()
        expect(dialog.props().open).toBeFalsy()
        expect(content).toBeDefined()

        trigger.simulate('click')
        expect(wrapper.find(Dialog).props().open).toBeTruthy()
        wrapper.find(Dialog).simulate('close')
        expect(wrapper.find(Dialog).props().open).toBeFalsy() 
    })
})