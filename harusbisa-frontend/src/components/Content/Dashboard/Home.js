import React from "react";
import {connect} from "react-redux";

function Home(props){
    return(
        <div>
            <h1>{props.course.courseName}</h1>
            <p>{props.course.courseDescription}</p>
            <p>{props.course.startTerm} - {props.course.endTerm}</p>
            <p>Kode bergabung: {props.course.joinCode}</p>
            <p>Jumlah sesi: {props.course.numberOfLectures}</p>
            <p>Jumlah murid: {props.course.numberOfStudents}</p>
        </div>
    )
}

function mapStateToProps(state){
    return{
        course: state.course
    }
}

export default connect(mapStateToProps)(Home);