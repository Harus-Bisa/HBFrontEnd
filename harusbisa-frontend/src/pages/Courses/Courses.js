import React, { useEffect } from "react";
import { withAuth } from "../withAuth";
import services from "../../Services";
import {connect} from "react-redux";
import { getCourses } from "../../redux/actions";
import { ProfCourseCard } from "../../components/Card/Card";

function mapStateToProps(state){
    if (state){
        return{
            courses: state.courses,
            loading: false
        };
    }
    return{
        loading: true
    }
    
}

function Courses(props){
    useEffect(() => {
        props.getCourses();
    })

    const logout = () =>{
        services.logout();
        props.history.push("/")
    }

    
    const makeCards = () => {
        var courses = props.courses;
        var cards = []
        for (var i=0; i<courses.length; i++){
            var course = courses[i];
            var cardProps = {
                title: course.course_name,
                link: "/dashboard/"+course._id 
            }
            cards.push(<ProfCourseCard key={i} content={cardProps}/>)
        }
        return cards
    };
    if (props.loading){
        return(<p>Loading</p>)
    }

    return(
        <div>
            Courses
            {makeCards()}
            <button onClick={logout}>logout</button>
        </div>
    )
}


export default connect(mapStateToProps, {getCourses})(withAuth(Courses));