import React from "react";
import { withAuth } from "../../withAuth";
import {connect} from "react-redux";
import { getCourses } from "../../../redux/actions";
import ProfCourseCard from "../../../components/Card/ProfCourseCard";
import profCourseImg from '../../../img/left_panel_picture_prof.png';
import Content from "../../../components/Content/Course/Content";

function mapStateToProps(state){
    return{
        courses: state.courses,
        loading: state.loading,
        firstName: state.firstName
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
            <div style={{position:'fixed', width:'100%'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-4 d-none d-md-block" style={{borderRight:"2px solid #f4f4f4"}}>
                            <div className="content">
                                <h1>Selamat datang ke Harus Bisa, {this.props.firstName}</h1>
                                <div style={{marginTop:"4rem"}}>
                                    <img src={profCourseImg} alt={"profCourseImg"} style={{width:"75%"}}/>
                                </div>
                                
                            </div>
                            
                        </div>
                        <div className="col" style={{overflow:'auto', maxHeight:'95vh'}}>
                            <Content/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, {getCourses})(withAuth(Courses));