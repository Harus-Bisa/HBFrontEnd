import React from "react";
import {connect} from "react-redux";

function mapStateToProps(state){
    return{
        // loading: state.loading,
        lectures: state.course.lectures
    }
}
function Sidebar(props){
    const makeButtons = () =>{
        var buttons = []
        for (var i=0; i<props.lectures.length; i++){
            var lecture = props.lectures[i]
            buttons.push(
                <button key={i}>{lecture.date}</button>
            )
        }
        return buttons;
    }
    return(
        <div>
            {makeButtons()}
        </div>
        
    )
}

export default connect(mapStateToProps)(Sidebar)