import React from "react";
import {connect} from "react-redux";
import {logout} from "../../redux/actions";
import {withRouter} from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import Popup from "../Popup/Popup";
import { Button } from "@material-ui/core";
import StudentCourseForm from "../Form/StudentCourseForm";
import Logo from "../Logo/Logo";

function mapStateToProps(state){
    return{
        firstName: state.firstName, 
        lastName: state.lastName,
        courses: state.courses,
        loading: state.loading,
        role: state.role
    }
}
function InsideNavbar(props){
    var [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const makeCourses = ()  => {
        var courses = []
        for (let i=0; i<props.courses.length; i++){
            courses.push(
                <DropdownItem key={i}><NavLink href={"/"+props.role+"/dashboard/"+props.courses[i].courseId}>{props.courses[i].courseName}</NavLink></DropdownItem>
            )
        }
        return courses;

    }
    const logout = () =>{
        props.logout()
        props.history.push("/")
    }
    if(props.loading){
        return <p>Loading</p>
    }
    return(
        <div style={{background:'#f4f4f4', position:'sticky', top:0, zIndex:999}} >
            <div className="container">
                <div className="d-none d-md-block">
                    <Navbar light expand="md">
                        <Nav navbar style={{width:'100%', justifyContent:'space-between'}}>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Kelas
                                </DropdownToggle>
                                <DropdownMenu>
                                    {makeCourses()}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            
                            <NavbarBrand href="/"><Logo/></NavbarBrand>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    {props.firstName} {props.lastName}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>Notifikasi</DropdownItem>
                                    <DropdownItem divider/>
                                    <DropdownItem href="/settings">Setting</DropdownItem>
                                    <DropdownItem>Bantuan</DropdownItem>
                                    <DropdownItem id="big-logoff" onClick={logout}>Log off</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                        </Nav>
                    </Navbar>
                </div>
                <div className="d-md-none">
                    <Navbar expand="md" color="faded" light>
                        <NavbarBrand href="/"><Logo/></NavbarBrand>
                        <Popup 
                            purpose={"+"} 
                            trigger={{component:Button}} 
                            content={StudentCourseForm}
                        />
                        <NavbarToggler onClick={toggle} className="mr-2"/>
                        <Collapse isOpen={isOpen} navbar>
                            <Nav navbar>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Kelas
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {makeCourses()}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        {props.firstName} {props.lastName}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="/settings">Settings</DropdownItem>
                                        <DropdownItem>Bantuan</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <NavItem id="small-logoff" onClick={logout}>
                                    Log off
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps,{logout})(withRouter(InsideNavbar));
