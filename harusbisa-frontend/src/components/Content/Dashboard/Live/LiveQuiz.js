import React from "react";
import {connect} from "react-redux";
import { timeFormat, makeProfAnswers } from "../../../Card/QuizCard";
import "../../../../css/card.css";


function LiveQuiz(props){
    return(
        <div className="live-quiz">
            <div className="container">
                <div className="row">
                    <div className="col-1">
                        <p>{props.quiz.index+1}.</p>
                    </div>
                    <div className="col-9">
                        <p>{props.quiz.question}</p>
                        <div style={{marginTop:"1rem"}}>
                            {makeProfAnswers(props.quiz.answerOptions, true, props.quiz.correctAnswerIndex)}
                        </div>
                    </div>
                    <div className="col-2">
                        <p>{timeFormat(props.quiz.duration)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        quiz: state.liveQuiz
    }
}
export default connect(mapStateToProps)(LiveQuiz);