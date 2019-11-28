import React from "react";
import { Card, CardContent } from "@material-ui/core";
import {connect} from "react-redux";

function mapStateToProps(state, ownProps){
    var quizzes = state.selectedLecture.quizzes
    
    return {
        quiz: quizzes[ownProps.index]
    }
}
function QuizCard(props){
    const makeAnswers = () =>{
        var answers = []
        for (let i=0; i<props.quiz.answerOptions.length; i++){
            answers.push(<div key={i}>{String.fromCharCode(i+65)}. {props.quiz.answerOptions[i]}</div>)
        }
        return answers
    }
    return(
        <Card className="card">
            <CardContent>
                <div>
                    <p>{props.index + 1}.  {props.quiz.question}</p>
                    <div>
                        {makeAnswers()}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default connect(mapStateToProps)(QuizCard);