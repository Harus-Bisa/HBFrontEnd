import React from "react";
import {connect} from "react-redux";
import { Button } from "@material-ui/core";
import StudentCourseForm from "../StudentCourseForm";
import Popup from "../../Popup/Popup";
import CourseSettingsCard from "../../Card/CourseSettingsCard";

function StudentCourseSettingsForm(props){
    const makeCards = ()=>{
        var cards = []
        for (let i=0; i<props.courses.length; i++){
            cards.push(<CourseSettingsCard key={i} id={props.courses[i].courseId}/>)
        }   
        return cards;     
    }
    return(
        <div>
            <div className="content" style={{borderBottom:"2px solid #F4F4F4", paddingLeft: 0, paddingRight:0}}>
                <div>
                    <h5>Kelas</h5>
                </div>
                <div>
                    {makeCards()}
                </div>
            </div>
            <div style={{padding:"2rem", justifyContent:'center', display:'flex'}}>
                <Popup 
                    purpose={"+ Tambah Kelas"} 
                    trigger={{component:Button, className:"student-button"}} 
                    content={StudentCourseForm}
                />
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        courses: state.courses
    }
}

export default connect(mapStateToProps)(StudentCourseSettingsForm);