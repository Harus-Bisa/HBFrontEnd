import React from "react";
import {connect} from "react-redux";
import { addCourse, editCourse } from "../../redux/actions";

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
        <div>
            <form onSubmit={submit}>
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
            </form>
        </div>
    )
}

export default connect(mapStateToProps,{addCourse, editCourse})(CourseForm);