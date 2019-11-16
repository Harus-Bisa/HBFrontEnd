import React from "react";
import {connect} from "react-redux";
import { getUser, getCourses } from "../../../redux/actions";
import { withAuth } from "../../withAuth";
import Content from "../../../components/Content/Course/Content";
import studentCourseImg from '../../../img/left_panel_picture_stud.png';

function mapStateToProps(state){
    return{
        courses: state.courses,
        firstName: state.firstName,
        lastName: state.lastName,
        loading: state.loading
    }
}
class Courses extends React.Component{
    render(){
        if (this.props.loading){
            return(null)
        }
        return(
            <div style={{position:'fixed', width:'100%'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-4 d-none d-md-block" style={{borderRight:"2px solid #f4f4f4"}}>
                            <div className="content">
                                <h1>Selamat datang ke Harus Bisa, {this.props.firstName}</h1>
                                <div style={{marginTop:"4rem"}}>
                                    <img src={studentCourseImg} alt={"studentCourseImg"} style={{width:"75%"}}/>
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

export default connect(mapStateToProps,{getCourses, getUser})(withAuth(Courses));