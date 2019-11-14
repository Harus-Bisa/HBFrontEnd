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
export function InsideNavbar(props){
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
                            
                            <NavbarBrand href="/">Harus Bisa</NavbarBrand>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    {props.firstName} {props.lastName}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>Notifikasi</DropdownItem>
                                    <DropdownItem divider/>
                                    <DropdownItem>Setting</DropdownItem>
                                    <DropdownItem>Bantuan</DropdownItem>
                                    <DropdownItem onClick={props.logout}>Log off</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                        </Nav>
                    </Navbar>
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
