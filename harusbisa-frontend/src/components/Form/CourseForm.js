import React from "react";
import {connect} from "react-redux";
import { addCourse, editCourse } from "../../redux/actions";
import { Form, FormGroup, Label, Input, FormText, Col} from 'reactstrap';
import { HB_YELLOW } from "../../css/constants/color";
import { Button } from "@material-ui/core";
import JoinCourseAnnoucement from "./JoinCourseAnnoucement";

function mapStateToProps(state, ownProps){
    if (ownProps.id){
        let courses = state.courses
        for (let i=0; i<courses.length; i++){
            if (courses[i].courseId === ownProps.id){
                return{
                    course: courses[i],
                    role: state.role
                }
            }
        }
        return null
    }
    else{
        return {
            course:{
                courseName: "",
                startTerm: "",
                endTerm: ""
            },
            role: state.role
        }
    }
    
}
const EDIT = "EDIT";
const ADD = "ADD";

function CourseForm(props){
    const [name, setName] = React.useState(props.course.courseName);
    const [startDate, setStartDate] = React.useState(props.course.startTerm);
    const [endDate, setEndDate] = React.useState(props.course.endTerm);
    const [addedNewCourse, setAddedNewCourse] = React.useState(false)
    const type = (props.id ? EDIT : ADD)

    const submit = (event) =>{
        event.preventDefault();
        if (type === EDIT){
            props.editCourse(props.id, name, startDate, endDate, props.role);
            props.closePopup();
        }
        else{
            props.addCourse(name, startDate, endDate, props.role);
            setAddedNewCourse(true)
        }
    }
    if(addedNewCourse){
        return(<JoinCourseAnnoucement closePopup={props.closePopup}/>)
    }
    var verified = name && startDate && endDate;
    return(
        <div className="container-fluid">
            <div className="row" style={{borderBottom:'2px solid '+HB_YELLOW}}>
                <div className="col-12" style={{display:'flex', justifyContent:'center', padding:'1rem 2rem'}}>
                    <h3>{type === ADD ? "Tambahkan Kelas Baru" : "Edit Kelas"}</h3>
                </div>
            </div>
            <div className="content">
                <Form onSubmit={submit} style={{minWidth:'50vw'}}>
                    <FormGroup row>
                        <Label sm={4}>Nama Kelas</Label>
                        <Col sm={8}>
                            <Input type="text" id="courseName" value={name} placeholder={"Contoh: Biologi Molekuler Kelas A"} onChange={(event) => setName(event.target.value)}/>
                            <FormText>Nama ini adalah nama yang akan dilihat siswa Anda.</FormText>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4}>Periode Kelas</Label>
                        <Col sm={8}>
                            <div className="row">
                                <div className="col-5">
                                    <Input type="select" name="select" id="startDate" value={startDate} onChange={(event) => setStartDate(event.target.value)}>
                                        <option>Juli 2019</option>
                                        <option>Juli 2020</option>
                                        <option>Juli 2021</option>
                                        <option>Juli 2022</option>
                                        <option>Juli 2023</option>
                                    </Input>
                                </div>
                                <div className="col-2" style={{display:'flex'}}>
                                    <p style={{margin:'auto'}}>-</p>
                                </div>
                                <div className="col-5">
                                    <Input type="select" name="select" id="endDate" value={endDate} onChange={(event) => setEndDate(event.target.value)}>
                                        <option>Juli 2019</option>
                                        <option>Juli 2020</option>
                                        <option>Juli 2021</option>
                                        <option>Juli 2022</option>
                                        <option>Juli 2023</option>
                                    </Input>
                                </div>
                            </div>
                        </Col>
                    </FormGroup>
                    <div className="row justify-content-end">
                        <div className="col-3">
                            <Button fullWidth className="prof-button" type="submit" disabled={!verified}>{type === ADD ? "Tambahkan" : "Edit"}</Button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default connect(mapStateToProps,{addCourse, editCourse})(CourseForm);