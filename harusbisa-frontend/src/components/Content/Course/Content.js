import React from "react";
import StudentCourseCard from "../../Card/StudentCourseCard";
import {connect} from "react-redux";

function mapStateToProps(state){
    return{
        courses: state.courses
    }
}

function Content(props){
    const makeCourses = () =>{
        var courses = props.courses
        var components = []
        for (let i=0; i<courses.length; i++){
            var id = courses[i]._id
            components.push(<StudentCourseCard key={i} id={id}/>)
        }
        if (courses.length === 0){
            return(<p>Make your first course!</p>)
        }
        return components;
    }
    return(
        <div>
            <header>
                <h1>Kelas Anda</h1>
            </header>
            <div className="row">
                {makeCourses()}
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(Content);