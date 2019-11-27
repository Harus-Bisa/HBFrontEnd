import React from "react";
import {connect} from "react-redux";
import { Form, FormGroup, Label, Input, FormText, Col} from 'reactstrap';
import { Button, Slider } from "@material-ui/core";
import {addLecture} from "../../redux/actions";

function LectureForm(props){
    var [date, setDate] = React.useState("");
    var [lectureDescription, setLectureDescription] = React.useState("")
    var [participationPercentage, setParticipationPercentage] = React.useState(Number(100));

    const submit = (event) =>{
        event.preventDefault();
        let dateMS = (new Date(date)).getTime()
        props.addLecture(dateMS, lectureDescription, participationPercentage, props.courseId, props.role)
    }
    return(
        <div className="container-fluid student-course-form">
            <div className="row">
                <div className="content col-md-5" style={{display:'flex'}}>
                    <h1 style={{margin:'auto', fontSize:"30px"}}>Tambah Sesi</h1>
                </div>
                <div className="content col-md-7">
                <Form onSubmit={submit}>
                    <FormGroup row>
                        <Label sm={4}>Nama Sesi</Label>
                        <Col sm={8}>
                            <Input
                                type="date"
                                id="lectureDate"
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                            />
                            <FormText>Tanggal ini akan menjadi nama sesi anda.</FormText>
                        </Col>
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
                        <Button type="submit" className="prof-button">Tambahkan</Button>
                    </div>
                </Form>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        role: state.role,
        courseId: state.course.courseId
    }
}
export default connect(mapStateToProps,{addLecture})(LectureForm);