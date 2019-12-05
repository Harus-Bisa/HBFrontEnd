import React from "react";
import {connect} from "react-redux";
import CourseForm from "../../Form/CourseForm";
import {Input, Button as RButton,FormGroup,Label, Col} from "reactstrap";
import { Button } from "@material-ui/core";

function Settings(props){
    return(
        <div>
            <header style={{borderBottom:'4px solid #F4F4F4'}}>
                <h1>Settings</h1>
            </header>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <CourseForm header={false} id={props.course.courseId}/>
                        <div className="container-fluid">
                            <div className="content">
                                <FormGroup row>
                                    <Label sm={3}>Kode Kelas</Label>
                                    <Col sm={6}>
                                        <Input value={props.course.joinCode} disabled/>
                                    </Col>
                                    <Col sm={3}>
                                        <RButton className="neutral-button" style={{width:'100%', height:'calc(1.5em + .75rem + 2px)'}}>Salin</RButton>
                                    </Col>
                                </FormGroup>
                                <FormGroup row style={{marginTop:"2rem"}}>
                                    <Col sm={9}>
                                        <h5>Download Daftar Nilai</h5>
                                        <p>Lihat nilai - nilai dan kehadiran siswa anda di kelas ini</p>
                                    </Col>
                                    <Col sm={3}>
                                        <RButton className="neutral-button" style={{width:'100%', height:'calc(1.5em + .75rem + 2px)'}}>Download Excel</RButton>
                                    </Col>
                                </FormGroup>
                                <Button>Download Sesi Kelas</Button>
                            </div>                                
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        course: state.course
    }
}
export default connect(mapStateToProps)(Settings);