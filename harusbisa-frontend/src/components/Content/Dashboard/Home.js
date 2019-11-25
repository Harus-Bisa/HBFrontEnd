import React from "react";
import {connect} from "react-redux";

function Home(props){
    return(
        <div className="content">
            <h1>{props.course.course_name}</h1>
            <p>{props.course.description}</p>
            <p>{props.course.start_term} - {props.course.end_term}</p>
            <p>Kode bergabung: {props.course.join_code}</p>
            <p>Jumlah sesi: {props.course.number_of_lectures}</p>
            <p>Jumlah murid: {props.course.number_of_students}</p>
        </div>
    )
}

function mapStateToProps(state){
    return{
        course: state.course
    }
}

export default connect(mapStateToProps)(Home);