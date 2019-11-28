import React from "react";
import { Card, CardContent, Collapse, CardActions } from "@material-ui/core";
import {connect} from "react-redux";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function mapStateToProps(state, ownProps){
    var quizzes = state.selectedLecture.quizzes
    
    return {
        quiz: quizzes[ownProps.index]
    }
}
function QuizCard(props){
    var [expand, setExpand] = React.useState(false)
    const makeAnswers = () =>{
        var answers = []
        for (let i=0; i<props.quiz.answerOptions.length; i++){
            answers.push(<div key={i}><p>{String.fromCharCode(i+65)}. {props.quiz.answerOptions[i]}</p></div>)
        }
        return answers
    }
    return(
        <Card className="card">
            <CardContent>
                <div className="row">
                    <div className="col-1">
                        <p>{props.index + 1}</p>
                    </div>
                    <div className="col-9">
                        <p>{props.quiz.question}</p>
                    </div>
                    <div className="col-2">
                        <ButtonIcon/>
                    </div>
                </div>
            </CardContent>
            <Collapse in={expand}>
                <div>
                    {makeAnswers()}
                </div>
            </Collapse>
            <CardActions>
                <ButtonIcon icon={ExpandMoreIcon} onClick={() => setExpand(!expand)}/>
            </CardActions>
        </Card>
    )
}

export default connect(mapStateToProps)(QuizCard);