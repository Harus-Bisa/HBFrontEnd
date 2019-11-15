import React from "react";
import TestRenderer  from "react-test-renderer";
import {InsideNavbar} from "../../components/Navbar/InsideNavbar";

describe("InsideNavbar component", () =>{
    let props;
    let insideNavbar;
    let instance;
    beforeEach(() =>{
        props = {
            courses: [{course_name:"default", _id:"123"}],
            logout: jest.fn()
        }
        inside
        insideNavbar = TestRenderer.create(<InsideNavbar courses={props.courses} logout={props.logout}/>)
        instance = insideNavbar.root;
    })

    xit("Matches snapshot", () =>{
        expect(insideNavbar.toJSON()).toMatchSnapshot();
    })
    
    xit("Renders the log off button", () =>{
        var logoffButton = instance.find((el) => el.type=="button" && el.children && el.children[0] === "Log off");
        expect(props.logout).not.toHaveBeenCalled()
        logoffButton.props.onClick()
        expect(props.logout).toHaveBeenCalled()
        expect(props.logout).toHaveBeenCalledTimes(1)
       
    })

    xit("Renders courses buttons", () =>{
        var courses = props.courses;
        courses.forEach(c =>{
            var buttons = instance.findAll((el) => el.type=="a" && el.children && el.children[0] === c.course_name)
            expect(buttons).toHaveLength(2)
        })
    })

})