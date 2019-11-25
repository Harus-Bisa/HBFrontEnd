import React from "react";
import StudentCourseCard from "../../Card/StudentCourseCard";
import {connect} from "react-redux";
import { Button } from "@material-ui/core";
import SearchBar from "../../SearchBar/SearchBar";
import Popup from "../../Popup/Popup";
import StudentCourseForm from "../../Form/StudentCourseForm";
import ErrorMessage from "../../Error/ErrorMessage";
import CourseForm from "../../Form/CourseForm";
import ProfCourseCard from "../../Card/ProfCourseCard";

function mapStateToProps(state){
    return{
        courses: state.courses,
        error: state.error,
        role: state.role
    }
}

function Content(props){
    var [displayedCourses, setDisplayedCourses] = React.useState([])
    var [search, setSearch] = React.useState("")

    const find = (searchKey) =>{
        var courses = props.courses
        var display = []
        if (searchKey !== ""){
            for (let i=0; i<courses.length; i++){
                var course = courses[i]
                if (course.courseName.toLowerCase().includes(searchKey.toLowerCase())){
                    display.push(course)
                }
            }
        }
        setSearch(search = searchKey)        
        setDisplayedCourses(displayedCourses = display)
    }
    const makeCourses = () =>{
        if (search !== "" && displayedCourses.length === 0){
            return(<div className="col content" style={{display:'flex'}}><p style={{margin:'auto'}}>Course not found. Please try another keyword.</p></div>)
        }
        var courses = displayedCourses.length === 0 ? props.courses : displayedCourses
        var components = []
        for (let i=0; i<courses.length; i++){
            var id = courses[i].courseId
            if (props.role === "student"){
                components.push(<StudentCourseCard key={i} id={id}/>)
            }
            else if(props.role === "faculty"){
                components.push(<ProfCourseCard key={i} id={id}/>)
            }
        }
        if (courses.length === 0){
            return(<div className="col content" style={{display:'flex'}}><p style={{margin:'auto'}}>Make your first course!</p></div>)
        }
        return components;
    }
    return(
        <div className="content">
            <header>
                <div className="row">
                    <div className="col-md-6 col-sm">
                        <h1>Kelas Anda</h1>
                    </div>
                    <div className="col-6 d-none d-md-block" style={{alignSelf: "center"}}>
                        <div className="row">
                            <div className="col-6" style={{display:'flex', justifyContent:'flex-end'}}>
                                <div style={{margin:'auto 0'}}>
                                    <SearchBar placeholder={"Cari kelas"} find={find}/>
                                </div>
                            </div>
                            <div className="col-6" style={{display:'flex', justifyContent:'flex-end'}}>
                                <div style={{margin:'auto 0'}}>
                                    <Popup 
                                        purpose={"+ Tambah Kelas"} 
                                        trigger={{component:Button, className:(props.role === "student" ? "student-button": "prof-button")}} 
                                        content={props.role === "student" ? StudentCourseForm : CourseForm}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {props.error && <ErrorMessage/>}
            <div className="row">
                {makeCourses()}
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(Content);