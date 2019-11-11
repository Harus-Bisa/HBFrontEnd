import React from "react";
import { withAuth } from "../../withAuth";
import services from "../../../Services";
import {connect} from "react-redux";
import { getCourses } from "../../../redux/actions";
import ProfCourseCard from "../../../components/Card/ProfCourseCard";
import Popup from "../../../components/Popup/Popup";
import CourseForm from "../../../components/Form/CourseForm";

function mapStateToProps(state){
    return{
        courses: state.courses,
        loading: state.loading
    };
}

class Courses extends React.Component{
    componentDidMount(){
        this.props.getCourses();
    }

    logout = () =>{
        services.logout();
        this.props.history.push("/")
    }
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
            return(<p>Loading</p>)
        }
    
        return(
            <div>
                Courses
                {this.makeCards()}
                <Popup purpose={"Add Course"} content={CourseForm}/>
                <button onClick={this.logout}>logout</button>
            </div>
        )
    }
}

export default connect(mapStateToProps, {getCourses})(withAuth(Courses));