import React from "react";
import {shallow} from "enzyme";
import '../../test-config';
import SearchBar from "../../components/SearchBar/SearchBar";

describe("SearchBar component", ()=>{
    let component;
    let mockFind = jest.fn(x => x)
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState])
    beforeAll(()=>{
        component = shallow(<SearchBar find={mockFind}/>)
    })
    it("matches snapshot",() =>{
        expect(component.html()).toMatchSnapshot();
    })
    it("finds", () =>{
        var value = '123'
        expect(mockFind).not.toHaveBeenCalled();
        expect(setState).not.toHaveBeenCalled();
        var input = component.find("input");
        expect(input).toBeDefined();
        input.simulate("change", {target:{value:value}})
        expect(mockFind).toHaveBeenCalled();
        expect(setState).toHaveBeenCalled();
        expect(mockFind.mock.results[0].value).toBe(value)
    })
})