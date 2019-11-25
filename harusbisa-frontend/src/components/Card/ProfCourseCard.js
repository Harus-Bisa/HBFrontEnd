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
        if (courses[i]._id === courseId){
            return {
                course: courses[i]
            }
        }
    }
    return null
}
function ProfCourseCard(props){
    const deleteCourse = () =>{
        props.deleteCourse(props.course._id)   
    }
    return(
        <div className="col-md-12">
            {/* <Card className="prof-card">
                <CardContent>
                    <h3><a href={"/faculty/dashboard/"+props.course._id}>{props.course.course_name}</a></h3>
                    <p>{props.course.join_code}</p>
                </CardContent>
                <CardActions>
                    <Button onClick={deleteCourse}>Delete</Button>
                    <Popup purpose={"Edit"} trigger={{component:Button}} content={CourseForm} id={props.course._id}/>
                </CardActions>
            </Card> */}
            <div className="prof-card">
                <div className="row">
                    <div className="col-6">
                        <h3><a href={"/faculty/dashboard/"+props.course._id}>{props.course.course_name}</a></h3>
                        <p>Kode Bergabung: {props.course.join_code}</p>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-5 more-info" >
                                <h3>{props.course.number_of_students}</h3>
                                <p>Mahasiswa</p>
                            </div>
                            <div className="col-5 more-info">
                                <h3>{props.course.number_of_lectures}</h3>
                                <p>Sesi</p>
                            </div>
                            <div className="col-2">
                                <MenuOptions 
                                    icon={MoreHorizIcon} 
                                    className="icon" 
                                    options={[
                                        <Popup purpose={"Edit"} trigger={{component:Button, style:{width:'100%'}}} content={CourseForm} id={props.course._id}/>, 
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