import React from "react";
import {connect} from "react-redux";
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

function mapStateToProps(state){
    return{
        firstName: state.firstName, 
        lastName: state.lastName,
        courses: state.courses
    }
}
function InsideNavbar(props){
    var [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const makeCourses = ()  => {
        var courses = []
        for (let i=0; i<props.courses.length; i++){
            courses.push(
                <DropdownItem key={i}><NavLink href={"/student/dashboard/"+props.courses[i]._id}>{props.courses[i].course_name}</NavLink></DropdownItem>
            )
        }
        return courses;

    }
    return(
        <div style={{background:'#f4f4f4'}}>
            <div className="container">
                <div className="d-none d-md-block">
                    <div className="row justify-content-center">
                        <div className="col-4">
                            <p>Dropdown 1</p>
                        </div>
                        <div className="col-4">
                            Logo
                        </div>
                        <div className="col-4">
                            <p>{props.firstName} {props.lastName}</p>
                            <button onClick={props.logout}>Logout</button>
                        </div>
                    </div>
                </div>
                <div className="d-sm-none">
                    <Navbar expand="md" color="faded" light>
                        <NavbarBrand href="/">Harus Bisa</NavbarBrand>
                        <button>+</button>
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
                                        <DropdownItem>Setting</DropdownItem>
                                        <DropdownItem>Bantuan</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <NavItem onClick={props.logout}>
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

export default connect(mapStateToProps)(InsideNavbar);
