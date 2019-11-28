import React from "react";
import {Input} from "reactstrap";
import { setAnswer, setCorrectAnswer, removeAnswer } from "../../redux/actions";
import { connect } from "react-redux";
import { FormControlLabel, Switch } from "@material-ui/core";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import CloseIcon from "@material-ui/icons/Close";

function AnswerForm(props){
    var [correct, setCorrect] = React.useState(props.option === props.correctAnswer)
    var [answer, setLocalAnswer] = React.useState(props.answer);
    
    const changeAnswer = (event) =>{
        // setLocalAnswer(event.target.value)
        props.setAnswer(props.option, event.target.value)
    }

    const changeCorrectAnswer = ()=>{
        props.setCorrectAnswer(props.option)
    }
    const removeAnswer = () =>{
        props.setNumOfAnswers(props.numOfAnswers - 1)
        props.removeAnswer(props.option)
    }
    React.useEffect(() => {
        setCorrect(props.option === props.correctAnswer)
        setLocalAnswer(props.answer)
    }, [props.correctAnswer, props.option, props.answer]);
    return(
        <div className="row" style={{marginTop:"15px", marginBottom:'15px'}}>
            <div className="col-1" style={{display:'flex'}}>
                <p style={{margin:'auto'}}>{String.fromCharCode(props.option+65)}.</p>
            </div> 
            <div className="col-11">
                <div className="form-control" style={{height:'auto'}}>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <Input
                            type="textArea"
                            placeholder={"Tulis jawaban anda disini"}
                            style={{padding:"0 0 .75rem 0", border:"none", boxShadow:"none"}}
                            value={answer}
                            onChange={changeAnswer}
                        />
                        {props.numOfAnswers > 2 && <ButtonIcon icon={CloseIcon} onClick={removeAnswer}/>}
                    </div>
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <FormControlLabel
                            control={
                            <Switch checked={correct} onChange={changeCorrectAnswer}/>
                            }
                            label="Jawaban benar"
                        />
                    </div>
                </div>
            </div>   
        </div>
    )
}
function mapStateToProps(state, ownProps){
    return{
        correctAnswer: state.correctAnswer,
        answer:state.answers && state.answers[ownProps.option] ? state.answers[ownProps.option] : ""
    }
}
export default connect(mapStateToProps, {setAnswer, setCorrectAnswer,removeAnswer})(AnswerForm)