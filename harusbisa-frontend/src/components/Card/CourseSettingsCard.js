import React from "react";
import {connect} from "react-redux";
import { Button } from "reactstrap";

function CourseSettingsCard(props){
    return(
        <div style={{margin:'30px 0px'}}>
            <div className="row">
                <div className="col-8">
                    <h5>{props.course.course_name}</h5>
                    <p>{props.course.instructor}</p>
                    <p>{props.course.start_term} - {props.course.end_term}</p>
                    <p>Kode Bergabung: {props.course.join_code}</p>
                </div>
                <div className="col-4">
                    <Button className="neutral-button" style={{width:'100%'}}>Drop kelas</Button>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state, ownProps){
    var id = ownProps.id

    for (let i=0; i<state.courses.length; i++){
        if (state.courses[i]._id === id){
            return {
                course: state.courses[i]
            }
        }
    }
    return {}
}

export default connect(mapStateToProps)(CourseSettingsCard)

