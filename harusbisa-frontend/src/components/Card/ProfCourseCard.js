import React from "react";
import {connect} from "react-redux";
import {deleteCourse} from "../../redux/actions";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Popup from "../Popup/Popup";
import CourseForm from "../Form/CourseForm";
import "../../css/card.css";
import MenuOptions from "../MenuOptions/MenuOptions";
import { Button} from "@material-ui/core";

function mapStateToProps(state, currentProps){
    var courseId = currentProps.id 
    var courses = state.courses
    for (var i=0; i<courses.length; i++){
        if (courses[i].courseId === courseId){
            return {
                course: courses[i]
            }
        }
    }
    return null
}
function ProfCourseCard(props){
    const deleteCourse = () =>{
        props.deleteCourse(props.course.courseId)   
    }
    return(
        <div className="col-md-12">
            <div className="prof-card">
                <div className="row">
                    <div className="col-6">
                        <h3><a href={"/faculty/dashboard/"+props.course.courseId}>{props.course.courseName}</a></h3>
                        <p>Kode Bergabung: {props.course.joinCode}</p>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-5 more-info" >
                                <h3>{props.course.numberOfStudents}</h3>
                                <p>Mahasiswa</p>
                            </div>
                            <div className="col-5 more-info">
                                <h3>{props.course.numberOfLectures}</h3>
                                <p>Sesi</p>
                            </div>
                            <div className="col-2">
                                <MenuOptions 
                                    icon={MoreHorizIcon} 
                                    className="icon" 
                                    options={[
                                        <Popup purpose={"Edit"} trigger={{component:Button, style:{width:'100%'}}} content={CourseForm} id={props.course.courseId}/>, 
                                        <Button fullWidth onClick={deleteCourse}>Hapus</Button>]
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, {deleteCourse})(ProfCourseCard);