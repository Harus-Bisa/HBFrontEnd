import React from "react";
import {connect} from "react-redux";
import LiveQuiz from "./LiveQuiz";
import LiveMenu from "./LiveMenu";
import "../../../../css/live.css";

function LiveLecture(props){
    return(
        <div className="fullscreen">
            <div className="container content">
                <LiveQuiz/>
                <LiveMenu/>
            </div>
        </div>
    )
}

export default connect()(LiveLecture);