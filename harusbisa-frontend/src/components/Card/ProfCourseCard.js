import React from "react";
import { Card, CardContent, CardActions, Button } from "@material-ui/core";
import {connect} from "react-redux";
import {deleteCourse} from "../../redux/actions";
import Popup from "../Popup/Popup";
import CourseForm from "../Form/CourseForm";

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
function ProfCourseCard(props){
    const styles={
        content: {background:"pink"}
    }
    const deleteCourse = () =>{
        props.deleteCourse(props.course._id)   
    }
    return(
        <div className="col-md-12">
            <Card>
                <CardContent style={styles.content}>
                    <h3><a href={"/faculty/dashboard/"+props.course._id}>{props.course.course_name}</a></h3>
                    <p>{props.course.join_code}</p>
                </CardContent>
                <CardActions>
                    <Button onClick={deleteCourse}>Delete</Button>
                    <Popup purpose={"Edit"} trigger={{component:Button}} content={CourseForm} id={props.course._id}/>
                </CardActions>
            </Card>
        </div>
    )
}

export default connect(mapStateToProps, {deleteCourse})(ProfCourseCard);