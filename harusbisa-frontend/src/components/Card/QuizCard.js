import React from "react";
import { Card, CardContent, Collapse, CardActions, Button, Switch, FormControlLabel } from "@material-ui/core";
import {connect} from "react-redux";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "../../css/card.css";
import { withStyles } from "@material-ui/styles";

function mapStateToProps(state, ownProps){
    var quizzes = state.selectedLecture.quizzes
    
    return {
        quiz: quizzes[ownProps.index],
        live: state.live
    }
}

function QuizCard(props){
    var [expand, setExpand] = React.useState(false)
    var [showCorrectAnswer, setShowCorrectAnswer] = React.useState(false)
    const makeAnswers = () =>{
        var answers = []
        for (let i=0; i<props.quiz.answerOptions.length; i++){
            if(showCorrectAnswer && i === props.quiz.correctAnswerIndex){
                answers.push(<div className="answer answer-correct" key={i}><p>{String.fromCharCode(i+65)}. {props.quiz.answerOptions[i]}</p></div>)
            }
            else{
                answers.push(<div className="answer" key={i}><p>{String.fromCharCode(i+65)}. {props.quiz.answerOptions[i]}</p></div>)
            }
        }
        return answers
    }
    const time = () =>{
        var duration = props.quiz.duration;
        var minute = String(Math.floor(duration/60))
        var second = String(duration%60);
        if(minute < 10){
            minute = "0" + String(minute)
        }
        if(second < 10){
            second = "0" + String(second);
        }
        return minute + ":" + second
    }
    const GreenSwitch = withStyles({
        switchBase: {
          color: "#ffffff",
          "&$checked": {
            color: "#82DAA4"
          },
          "&$checked + $track": {
            backgroundColor: "#82DAA4",
            color: '#82DAA4'
          }
        },
        checked: {},
        track: {}
      })(Switch);

    return(
        <Card className="card quiz-card">
            <CardContent className="card-content">
                <div className="row">
                    <div className="col-1">
                        <p>{props.index + 1}</p>
                    </div>
                    <div className="col-10">
                        <p id="question">{props.quiz.question}</p>
                    </div>
                    <div className="col-1">
                        <ButtonIcon style={{margin:'auto'}}/>
                    </div>
                </div>
            </CardContent>
            <Collapse in={expand} timeout='auto' unmountOnExit className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="collapse-content">
                            {makeAnswers()}
                        </div>
                    </div>
                </div>
            </Collapse>
            <CardActions className="action">
                <div>
                    <ButtonIcon icon={ExpandMoreIcon} className={expand ? "icon-button expand-true": "icon-button expand-false"} onClick={() => setExpand(!expand)}/>
                    {expand && <FormControlLabel style={{marginRight:'15px', marginLeft:'15px'}} control={<GreenSwitch checked={showCorrectAnswer} onChange={() =>setShowCorrectAnswer(!showCorrectAnswer)}/>} label="Jawaban benar"/>}
                </div>
                <div>
                    <p style={{margin:'auto 15px'}}>{time()}</p>
                    <Button className={props.live ? "prof-button hvr-pulse" : "clear-button"}>Mulai</Button>
                </div>
            </CardActions>
        </Card>
    )
}

export default connect(mapStateToProps)(QuizCard);