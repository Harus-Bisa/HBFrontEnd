import React from "react";
import {connect} from "react-redux";
import { Button } from "reactstrap";
import {deleteCourse} from "../../redux/actions";

function CourseSettingsCard(props){
    const deleteCourse = () =>{
        props.deleteCourse(props.course.courseId, props.role)
    }
    return(
        <div style={{margin:'30px 0px'}}>
            <div className="row">
                <div className="col-8">
                    <h5>{props.course.courseName}</h5>
                    <p>{props.course.instructors[0]}</p>
                    <p>{props.course.startTerm} - {props.course.endTerm}</p>
                    <p>Kode Bergabung: {props.course.joinCode}</p>
                </div>
                <div className="col-4">
                    <Button className="neutral-button" style={{width:'100%'}} onClick={deleteCourse}>Drop kelas</Button>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state, ownProps){
    var id = ownProps.id

    for (let i=0; i<state.courses.length; i++){
        if (state.courses[i].courseId === id){
            return {
                course: state.courses[i],
                role: state.role
            }
        }
    }
    return {}
}

export default connect(mapStateToProps,{deleteCourse})(CourseSettingsCard)

