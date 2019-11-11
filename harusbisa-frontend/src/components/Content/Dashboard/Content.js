import React from "react";
import {connect} from "react-redux";
import QuizCard from "../../Card/QuizCard";

function mapStateToProps(state){
    return {
        lecture: state.selectedLecture
    }
}
function Content(props){
    const makeQuizzes = () =>{
        var quizzes = []
        for (let i=0; i<props.lecture.quizzes.length; i++){
            quizzes.push(<QuizCard key={i} index={i}/>)
        }
        return quizzes;
    }
    if (!props.lecture){
        return(
            <div>Make your first lecture</div>
        )
    }
    return(
        <div>
            <header>
                <h1>Sesi {props.lecture.date}</h1>
            </header>
            <div>
                {makeQuizzes()}
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(Content);
