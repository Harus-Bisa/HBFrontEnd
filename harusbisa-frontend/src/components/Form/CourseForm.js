import React from "react";
import {connect} from "react-redux";
import { addCourse, editCourse } from "../../redux/actions";
import { Form, FormGroup, Label, Input, FormText, Col} from 'reactstrap';
import { HB_YELLOW } from "../../css/constants/color";
import { Button } from "@material-ui/core";
import JoinCourseAnnoucement from "./JoinCourseAnnoucement";
import Picker from 'react-month-picker';
import "../../css/month-picker.css";
function mapStateToProps(state, ownProps){
    if (ownProps.id){
        let courses = state.courses
        for (let i=0; i<courses.length; i++){
            if (courses[i].courseId === ownProps.id){
                return{
                    course: courses[i],
                    role: state.role,
                    cLoading: state.cLoading
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
            role: state.role,
            cLoading: state.cLoading
        }
    }
    
}
const EDIT = "EDIT";
const ADD = "ADD";

function CourseForm(props){
    let pickerLang = {
        months: ["Januari", "Februari","Maret", "April", "Mei", "Juni", "Juli","Agustus", "September", "Oktober", "November", "Desember"]
    }

    const [startTermMonth, startTermYear] = props.course.startTerm.split(" ")
    const [endTermMonth, endTermYear] = props.course.endTerm.split(" ")
    const [name, setName] = React.useState(props.course.courseName);
    const [startTerm, setStartTerm] = React.useState({year:Number(startTermYear), month:pickerLang.months.indexOf(startTermMonth)+1})
    const [endTerm, setEndTerm] = React.useState({year:Number(endTermYear), month:pickerLang.months.indexOf(endTermMonth)+1})
    const [addedNewCourse, setAddedNewCourse] = React.useState(false)
    const type = (props.id ? EDIT : ADD)

    const submit = (event) =>{
        let startTermText = makeText(startTerm)
        let endTermText = makeText(endTerm)

        event.preventDefault();
        if (type === EDIT){
            props.editCourse(props.id, name, startTermText, endTermText, props.role);
            {props.closePopup && props.closePopup();}
        }
        else{
            props.addCourse(name, startTermText, endTermText, props.role);
            setAddedNewCourse(true)
        }
    }
    if(addedNewCourse && !props.cLoading){
        return(<JoinCourseAnnoucement closePopup={props.closePopup}/>)
    }
    var verified = name && startTerm && endTerm;
    const currentYear = (new Date()).getFullYear()
    
    let makeText = m => {
        if (m && m.year && m.month) return (pickerLang.months[m.month-1] + ' ' + m.year)
        return ' '
    }
    const _handleClickRangeBox = (e)=> {
        pickRange.current.show()
    }
    const handleRangeChange = (year, monthIndex, listIndex) =>{
        if(listIndex === 0){
            //startTerm
            setStartTerm({year:year, month:monthIndex})
            pickRange.current.show()
        }
        else if(listIndex === 1){
            //endTerm
            setEndTerm({year:year, month:monthIndex})
            pickRange.current.show()
        }
    }
    const handleRangeDismiss = (value) =>{
        setStartTerm(value.from)
        setEndTerm(value.to)
    }
    const pickRange = React.createRef("pickRange")
    if(props.cLoading){
        return(<p>Loading</p>)
    }
    return(
        <div className="container-fluid">
            {props.header && <div className="row" style={{borderBottom:'2px solid '+HB_YELLOW}}>
                <div className="col-12" style={{display:'flex', justifyContent:'center', padding:'1rem 2rem'}}>
                    <h3>{type === ADD ? "Tambahkan Kelas Baru" : "Edit Kelas"}</h3>
                </div>
            </div>}
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
                            <Picker
                                ref= {pickRange}
                                years={{min: currentYear, max: currentYear+5}}
                                range={{from:startTerm, to:endTerm}}
                                lang={pickerLang}
                                onChange={handleRangeChange}
                                onDismiss={handleRangeDismiss}
                                id="term"
                                >
                                <Input value={makeText(startTerm) + ' - ' + makeText(endTerm)} onClick={_handleClickRangeBox}/>
                            </Picker>
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

CourseForm.defaultProps={
    header: true
}
export default connect(mapStateToProps,{addCourse, editCourse})(CourseForm);