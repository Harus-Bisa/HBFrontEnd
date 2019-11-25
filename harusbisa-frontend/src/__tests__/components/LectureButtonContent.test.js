import React from "react";
import {shallow} from "enzyme";
import '../../test-config';
import LectureButtonContent from "../../components/LectureButton/LectureButtonContent";
import AddIcon from '@material-ui/icons/Add';

describe("LectureButtonContent component", () =>{
    it("matches snapshot", () =>{
        let component = shallow(<LectureButtonContent/>)
        expect(component.html()).toMatchSnapshot();
    })

    it("renders icon", () =>{
        let component = shallow(<LectureButtonContent icon={AddIcon}/>)
        let icon = component.find(".student-icon")
        expect(icon.html()).not.toBe(null)
    })
    it("does not renders icon", () =>{
        let component = shallow(<LectureButtonContent/>)
        let icon = component.find(".student-icon")
        expect(icon).toHaveLength(0)
    })
})