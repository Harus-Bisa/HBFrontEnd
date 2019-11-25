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
    const [startTermMonth, setStartTermMonth] = React.useState(props.course.startTerm.split(" ")[0]);
    const [startTermYear, setStartTermYear] = React.useState(props.course.startTerm.split(" ")[1])
    const [endTermMonth, setEndTermMonth] = React.useState(props.course.endTerm.split(" ")[0]);
    const [endTermYear, setEndTermYear] = React.useState(props.course.endTerm.split(" ")[1])
    const [addedNewCourse, setAddedNewCourse] = React.useState(false)
    const type = (props.id ? EDIT : ADD)

    const submit = (event) =>{
        let startTerm = startTermMonth + " " + startTermYear
        let endTerm = endTermMonth + " " + endTermYear

        event.preventDefault();
        if (type === EDIT){
            props.editCourse(props.id, name, startTerm, endTerm, props.role);
            props.closePopup();
        }
        else{
            props.addCourse(name, startTerm, endTerm, props.role);
            setAddedNewCourse(true)
        }
    }
    if(addedNewCourse){
        return(<JoinCourseAnnoucement closePopup={props.closePopup}/>)
    }
    var verified = name && startTermMonth && startTermYear && endTermYear && endTermMonth;
    const month = ["","Jan", "Feb","Mar", "Apr", "Mei", "Jun", "Jul","Agu", "Sep", "Okt", "Nov", "Des"]
    const currentYear = (new Date()).getFullYear()
    const makeYearArray = () =>{
        var years = [""]
        let y = currentYear;
        while (y < currentYear + 5){
            years.push(y)
            y +=1
        }
        return years
    }
    const makeOptions = (array) =>{
        var options = []
        for (let i=0; i<array.length; i++){
            options.push(<option key={i}>{array[i]}</option>)
        }
        return options
    }
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
                        <Label sm={3}>Nama Kelas</Label>
                        <Col sm={9}>
                            <Input type="text" id="courseName" value={name} placeholder={"Contoh: Biologi Molekuler Kelas A"} onChange={(event) => setName(event.target.value)}/>
                            <FormText>Nama ini adalah nama yang akan dilihat siswa Anda.</FormText>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={3}>Periode Kelas</Label>
                        <Col sm={9}>
                            <div style={{display:'flex', flexDirection:'row'}}>
                                <Input type="select" name="select" id="startTermMonth" value={startTermMonth} onChange={(event) => setStartTermMonth(event.target.value)}>
                                    {makeOptions(month)}
                                </Input>
                                <Input type="select" name="select" id="startTermYear" value={startTermYear} onChange={(event) => setStartTermYear(event.target.value)}>
                                    {makeOptions(makeYearArray())}
                                </Input>
                                <div className="col-2" style={{display:'flex', padding:0}}>
                                    <p style={{margin:'auto'}}>-</p>
                                </div>
                                <Input type="select" name="select" id="endTermMonth" value={endTermMonth} onChange={(event) => setEndTermMonth(event.target.value)}>
                                    {makeOptions(month)}
                                </Input>
                                <Input type="select" name="select" id="endTermYear" value={endTermYear} onChange={(event) => setEndTermYear(event.target.value)}>
                                    {makeOptions(makeYearArray())}
                                </Input>
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