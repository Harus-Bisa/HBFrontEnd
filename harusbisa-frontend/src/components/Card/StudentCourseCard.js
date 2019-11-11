import React from "react";
import { Card, CardContent, CardActions, Button } from "@material-ui/core";
import {connect} from "react-redux";
import {deleteCourse} from "../../redux/actions";
import "../../css/card.css";

function mapStateToProps(state, currentProps){
    var courseId = currentProps.id 
    var courses = state.courses
    for (var i=0; i<courses.length; i++){
        if (courses[i]._id === courseId){
            return {
                course: courses[i]
            }
        }
    }
    return null
}
function StudentCourseCard(props){
    const deleteCourse = () =>{
        props.deleteCourse(props.course._id)   
    }
    return(
        <div className="col-md-6">
            <Card className="card student-card">
                <CardContent>
                    <h5><a href={"/student/dashboard/"+props.course._id}>{props.course.course_name}</a></h5>
                    <p>{props.course.start_term} - {props.course.end_term}</p>
                    <p>{props.course.instructor}</p>
                </CardContent>
                <CardActions className="action">
                    {/* <Button onClick={deleteCourse}>Delete</Button> */}
                    <p>{props.course.number_of_lectures} Sesi</p>
                </CardActions>
            </Card>
        </div>
    )
}

export default connect(mapStateToProps, {deleteCourse})(StudentCourseCard);