import React from "react";
import {connect} from "react-redux";
import { addCourse, editCourse } from "../../redux/actions";
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Col} from 'reactstrap';
import { HB_YELLOW } from "../../css/constants/color";
import { Button } from "@material-ui/core";

function mapStateToProps(state, ownProps){
    if (ownProps.id){
        let courses = state.courses
        for (let i=0; i<courses.length; i++){
            if (courses[i]._id === ownProps.id){
                return{
                    course: courses[i]
                }
            }
        }
        return null
    }
    else{
        return {
            course:{
                course_name: "",
                start_term: "",
                end_term: ""
            }
        }
    }
    
}
function CourseForm(props){
    const [name, setName] = React.useState(props.course.course_name);
    const [startDate, setStartDate] = React.useState(props.course.start_term);
    const [endDate, setEndDate] = React.useState(props.course.end_term);
    
    const submit = (event) =>{
        event.preventDefault();
        if (props.id){
            props.editCourse(props.id, name, startDate, endDate);
        }
        else{
            props.addCourse(name, startDate, endDate);
        }
        props.closePopup();
    }
    return(
        <div className="container-fluid">
            {/* <form onSubmit={submit}>
                <label>Course Name*</label>
                <input type="text" value={name} onChange={(event) => setName(event.target.value)}></input>
                <br/>
                <label>Start Date*</label>
                <input type="text" value={startDate} onChange={(event) => setStartDate(event.target.value)}></input>
                <br/>
                <label>End Date*</label>
                <input type="text" value={endDate} onChange={(event) => setEndDate(event.target.value)}></input>
                <br/>
                <button type="submit">Submit</button>
            </form> */}
            <div className="row" style={{borderBottom:'2px solid '+HB_YELLOW}}>
                <div className="col-12" style={{display:'flex', justifyContent:'center', padding:'1rem 2rem'}}>
                    <h3>Tambahkah Kelas Baru</h3>
                </div>
            </div>
            <div className="content">
                <Form onSubmit={submit}>
                    <FormGroup row>
                        <Label sm={5}>Nama Kelas</Label>
                        <Col sm={7}>
                            <Input type="text" value={name} placeholder={"Contoh: Biologi Molekuler Kelas A"} onChange={(event) => setName(event.target.value)}/>
                            <FormText>Nama ini adalah nama yang akan dilihat siswa Anda.</FormText>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={5}>Periode Kelas</Label>
                        <Col sm={7}>
                            <div className="row">
                                <div className="col-5">
                                    <Input type="select" name="select" id="exampleSelect">
                                        <option>Juli 2019</option>
                                        <option>Juli 2020</option>
                                        <option>Juli 2021</option>
                                        <option>Juli 2022</option>
                                        <option>Juli 2023</option>
                                    </Input>
                                </div>
                                <div className="col-2">
                                    <p>-</p>
                                </div>
                                <div className="col-5">
                                    <Input type="select" name="select" id="exampleSelect">
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
                    <Button className="prof-button" type="submit">Submit</Button>
                </Form>
            </div>
        </div>
    )
}

export default connect(mapStateToProps,{addCourse, editCourse})(CourseForm);