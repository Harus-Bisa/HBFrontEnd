import React from "react";
import {connect} from "react-redux";
import { Form, FormGroup, Label, Input, FormText, Col} from 'reactstrap';
import { Button, Slider } from "@material-ui/core";
import {addLecture, editLecture} from "../../redux/actions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function LectureForm(props){
    const type = (props.id && props.lecture ? "EDIT" : "ADD")
    var [date, setDate] = React.useState(type === "ADD" ? new Date() : new Date(props.lecture.date));
    var [lectureDescription, setLectureDescription] = React.useState(type === "ADD" ? "" : props.lecture.lectureDescription)
    var [participationPercentage, setParticipationPercentage] = React.useState(type === "ADD" ? Number(100) : props.lecture.participationRewardPercentage);
    

    const submit = (event) =>{
        event.preventDefault();
        let dateMS = (new Date(date)).getTime()
        if(type === "ADD"){
            props.addLecture(dateMS, lectureDescription, participationPercentage, props.courseId, props.role)
        }
        else if (type === "EDIT"){
            //editLecture
            props.editLecture(dateMS, lectureDescription, participationPercentage, props.courseId, props.id, props.role)
        }
        props.closePopup()
        
    }
    return(
        <div className="container-fluid student-course-form">
            <div className="row">
                <div className="content col-md-5" style={{display:'flex'}}>
                    <h1 style={{margin:'auto', fontSize:"30px"}}>{type === "ADD" ? "Tambah Sesi":"Edit Sesi"}</h1>
                </div>
                <div className="content col-md-7">
                <Form onSubmit={submit}>
                    <FormGroup style={{display:'flex', flexDirection:'column'}}>
                        <Label>Nama Sesi</Label>
                        <DatePicker 
                            id="lectureDate" 
                            selected={date} 
                            onChange={(date) => setDate(date)} 
                            dateFormat="dd/MM/yyyy"
                        />
                        <FormText>Tanggal ini akan menjadi nama sesi anda.</FormText>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4}>Deskripsi</Label>
                        <Col sm={8}>
                            <Input
                                type="text"
                                id="lectureDescription"
                                value={lectureDescription}
                                onChange={(event) => setLectureDescription(event.target.value)}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label>Persentase</Label>
                        <div className="container">
                            <Slider
                                value={participationPercentage}
                                onChange={(event, newValue) => setParticipationPercentage(newValue)}
                                min={0}
                                max={100}
                            />
                        </div>
                        <div style={{display:'flex', justifyContent:"space-between"}}>
                            <div>
                                <p>Partisipasi: {participationPercentage}%</p>
                            </div>
                            <div>
                                <p>Benar: {100 - participationPercentage}%</p>
                            </div>
                        </div>
                    </FormGroup>
                    <div style={{justifyContent:'flex-end', display:'flex'}}>
                        <Button type="submit" className="prof-button">{type === "ADD" ? "Tambahkan":"Edit"}</Button>
                    </div>
                </Form>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state, ownProps){
    for (let i=0; i<state.course.lectures.length; i++){
        let lecture = state.course.lectures[i]
        if (lecture.lectureId === ownProps.id){
            return{
                role: state.role,
                courseId: state.course.courseId,
                lecture: lecture
            }
        }
    }
    return{
        role: state.role,
        courseId: state.course.courseId
    }
    
}
export default connect(mapStateToProps,{addLecture, editLecture})(LectureForm);