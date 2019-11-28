import React from "react";
import {Input} from "reactstrap";
import { setAnswer, setCorrectAnswer } from "../../redux/actions";
import { connect } from "react-redux";
import { FormControlLabel, Switch } from "@material-ui/core";

function AnswerForm(props){
    var [correct, setCorrect] = React.useState(props.option === props.correctAnswer)
    var [answer, setLocalAnswer] = React.useState("");
    
    const changeAnswer = (event) =>{
        setLocalAnswer(event.target.value)
        props.setAnswer(props.option, event.target.value)
    }

    const changeCorrectAnswer = ()=>{
        // setCorrect(!correct)
        props.setCorrectAnswer(props.option)
    }

    React.useEffect(() => setCorrect(props.option === props.correctAnswer), [props.correctAnswer, props.option]);
    return(
        <div className="row" style={{marginTop:"15px", marginBottom:'15px'}}>
            <div className="col-1" style={{display:'flex'}}>
                <p style={{margin:'auto'}}>{String.fromCharCode(props.option+65)}.</p>
            </div> 
            <div className="col-11">
                <div className="form-control" style={{height:'auto'}}>
                    <Input
                        type="textArea"
                        placeholder={"Tulis jawaban anda disini"}
                        style={{padding:"0 0 .75rem 0", border:"none", boxShadow:"none"}}
                        value={answer}
                        onChange={changeAnswer}
                    />
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
function mapStateToProps(state){
    return{
        correctAnswer: state.correctAnswer
    }
}
export default connect(mapStateToProps, {setAnswer, setCorrectAnswer})(AnswerForm)