import React from "react";
import {connect} from "react-redux";
import { Button } from "@material-ui/core";
import { changeSelectedLecture } from "../../redux/actions";

function mapStateToProps(state){
    return{
        lectures: state.course.lectures
    }
}

function mapDispatchToProps(dispatch){
    return{
        changeSelectedLecture: lecture => dispatch(changeSelectedLecture(lecture))
    };
}
function Sidebar(props){
    const makeButtons = () =>{
        var buttons = []
        for (var i=0; i<props.lectures.length; i++){
            var lecture = props.lectures[i]
            buttons.push(
                <Button fullWidth key={i} props={lecture} onClick={changeSelectedLecture.bind(this,lecture)}>{lecture.date}</Button>
            )
        }
        return buttons;
    }

    const changeSelectedLecture = (lecture) =>{
        props.changeSelectedLecture(lecture)
    }

    return(
        <div>
            {makeButtons()}
        </div>
        
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)