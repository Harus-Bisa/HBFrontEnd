import {withAuth} from "../../pages/withAuth";
import React from "react";
import {shallow} from "enzyme";
import '../../test-config';

describe("withAuth function", () =>{
    it("does not render page when not logged in", () =>{
        var mockPush = jest.fn()
        const Component = <h1>Random Component</h1>
        const WrappedComponent= withAuth(Component)
        var item = shallow(<WrappedComponent history={{push:mockPush}} loggedIn={false}/>);
        expect(item.html()).toBe(null)
        expect(mockPush).toBeCalled()
        jest.clearAllMocks()
    })
})