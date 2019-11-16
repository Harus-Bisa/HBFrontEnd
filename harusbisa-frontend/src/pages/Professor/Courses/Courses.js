import React from "react";
import { withAuth } from "../../withAuth";
import {connect} from "react-redux";
import { getCourses } from "../../../redux/actions";
import ProfCourseCard from "../../../components/Card/ProfCourseCard";
import Popup from "../../../components/Popup/Popup";
import CourseForm from "../../../components/Form/CourseForm";
import { Button } from "@material-ui/core";

function mapStateToProps(state){
    return{
        courses: state.courses,
        loading: state.loading
    };
}

class Courses extends React.Component{
    makeCards = () => {
        var courses = this.props.courses;
        var cards = []
        for (var i=0; i<courses.length; i++){
            var course = courses[i];
            cards.push(<ProfCourseCard key={i} id={course._id}/>)
        }
        return cards
    };

    render(){
        if (this.props.loading){
            return null
        }
    
        return(
            <div>
                Courses
                {this.makeCards()}
                <Popup purpose={"Add Course"} trigger={{component:Button}} content={CourseForm}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, {getCourses})(withAuth(Courses));