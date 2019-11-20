import React from "react";
import {shallow} from "enzyme";
import '../../test-config';
import { StudentCourseForm } from "../../components/Form/StudentCourseForm";

describe("StudentCourseForm component", () =>{
    let component;
    let mockStudentAddCourse = jest.fn();
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState])
    let mockPreventDefault = jest.fn();

    beforeEach(() =>{
        component = shallow(<StudentCourseForm studentAddCourse={mockStudentAddCourse}/>)
    })
    afterEach(() =>{
        jest.clearAllMocks()
    })

    it("Matches snapshot", () =>{
        expect(component.html()).toMatchSnapshot();
    })
    it ("change state with form entry", () =>{
        var joinCodeField = component.find("#joinCode");
        expect(joinCodeField).toBeDefined();
        expect(setState).not.toHaveBeenCalled()
        joinCodeField.simulate("change",{target:{value:'123'}})
        expect(setState).toHaveBeenCalledTimes(1)
    })
    it("adds course", () =>{
        var form = component.find("form")
        expect(form).toBeDefined()
        expect(mockStudentAddCourse).not.toHaveBeenCalled()
        expect(mockPreventDefault).not.toHaveBeenCalled()
        form.simulate("submit", {preventDefault:mockPreventDefault})
        expect(mockStudentAddCourse).toHaveBeenCalled()
        expect(mockPreventDefault).toHaveBeenCalled()
    })
})
