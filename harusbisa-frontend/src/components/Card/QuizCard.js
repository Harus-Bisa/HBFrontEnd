import React from "react";
import { Card, CardContent, Collapse, CardActions, Button, Switch, FormControlLabel } from "@material-ui/core";
import {connect} from "react-redux";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "../../css/card.css";
import { withStyles } from "@material-ui/styles";
import Popup from "../Popup/Popup";
import MenuOptions from "../MenuOptions/MenuOptions";
import MultipleChoiceQuizForm from "../Form/Quiz/MultipleChoiceQuizForm";
import { deleteQuiz, setFullscreen, setLiveQuiz } from "../../redux/actions";

function mapStateToProps(state, ownProps){
    var quizzes = state.selectedLecture.quizzes
    
    return {
        quiz: quizzes[ownProps.index],
        liveLecture: state.liveLecture,
        lectureId: state.selectedLecture.lectureId
    }
}
export function timeFormat(duration){
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
export function makeProfAnswers(answerOptions, showCorrectAnswer, correctAnswerIndex){
    var answers = []
    for (let i=0; i<answerOptions.length; i++){
        if(showCorrectAnswer && i === correctAnswerIndex){
            answers.push(<div className="answer answer-correct" key={i}><p>{String.fromCharCode(i+65)}. {answerOptions[i]}</p></div>)
        }
        else{
            answers.push(<div className="answer" key={i}><p>{String.fromCharCode(i+65)}. {answerOptions[i]}</p></div>)
        }
    }
    return answers
}
function QuizCard(props){
    var [expand, setExpand] = React.useState(false)
    var [showCorrectAnswer, setShowCorrectAnswer] = React.useState(false)
    
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
    
    const handleDelete = () =>{
        props.deleteQuiz(props.lectureId, props.index)
    }
    const handleLiveQuiz = () =>{
        props.setLiveQuiz(props.index)
        props.setFullscreen(true)
    }
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
                        <MenuOptions
                            className="icon" 
                            options={[
                                <Popup purpose={"Edit"} trigger={{component:Button, style:{width:'100%'}}} content={MultipleChoiceQuizForm} id={props.index}/>, 
                                <Button fullWidth onClick={handleDelete}>Hapus</Button>]
                            }
                        />
                    </div>
                </div>
            </CardContent>
            <Collapse in={expand} timeout='auto' unmountOnExit className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="collapse-content">
                            {makeProfAnswers(props.quiz.answerOptions, showCorrectAnswer, props.quiz.correctAnswerIndex)}
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
                    <p style={{margin:'auto 15px'}}>{timeFormat(props.quiz.duration)}</p>
                    <Button 
                        className={props.liveLecture ? "prof-button hvr-pulse" : "clear-button"} 
                        disabled={!props.liveLecture}
                        onClick={handleLiveQuiz} 
                    >
                        Mulai
                    </Button>
                </div>
            </CardActions>
        </Card>
    )
}

export default connect(mapStateToProps,{deleteQuiz, setFullscreen, setLiveQuiz})(QuizCard);