import React from "react";
import StudentCourseCard from "../../Card/StudentCourseCard";
import {connect} from "react-redux";
import { Button } from "@material-ui/core";
import SearchBar from "../../SearchBar/SearchBar";
import Popup from "../../Popup/Popup";
import StudentCourseForm from "../../Form/StudentCourseForm";
// import CourseForm from "../../Form/CourseForm";

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
        <div className="content">
            <header>
                <div className="row">
                    <div className="col-6">
                        <h1>Kelas Anda</h1>
                    </div>
                    <div className="col-6 d-none d-md-block" style={{alignSelf: "center"}}>
                        <div className="row">
                            <div className="col-6" style={{display:'flex', justifyContent:'flex-end'}}>
                                <div style={{margin:'auto 0'}}>
                                    <SearchBar placeholder={"Cari kelas"}/>
                                </div>
                            </div>
                            <div className="col-6" style={{display:'flex', justifyContent:'flex-end'}}>
                                <div style={{margin:'auto 0'}}>
                                    <Popup 
                                        purpose={"+ Tambah Kelas"} 
                                        trigger={{component:Button, className:"student-button"}} 
                                        content={StudentCourseForm}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </header>
            <div className="row">
                {makeCourses()}
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(Content);