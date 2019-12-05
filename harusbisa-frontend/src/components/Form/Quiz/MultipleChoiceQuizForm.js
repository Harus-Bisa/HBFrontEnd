import React from "react"
import { Form, FormGroup, Label, Input, Button as RButton, Col} from 'reactstrap';
import {connect} from "react-redux";
import { Button } from "@material-ui/core";
import AnswerForm from "./AnswerForm";
import { addQuiz, removeAnwers, setAnswer, setCorrectAnswer } from "../../../redux/actions";

function MultipleChoiceQuizForm(props){
    var [question, setQuestion] = React.useState(props.quiz ? props.quiz.question : "")
    var [numOfAnswers, setNumOfAnswers] = React.useState(props.quiz ? props.quiz.answerOptions.length : 2)
    var [points, setPoints] = React.useState(props.quiz ? props.quiz.pointWorth : 1)
    var [duration, setDuration] = React.useState(props.quiz ? props.quiz.duration : 60)
    const type = (props.id !== null && props.id !== undefined ? "EDIT" : "ADD")

    const submit = (event) =>{
        event.preventDefault();
        props.addQuiz(props.lectureId, question, props.answers,props.correctAnswer, duration, points)
    }
    const incrementNumOfAns = () =>{
        setNumOfAnswers(numOfAnswers + 1)
    }
    const makeAnswers = () =>{
        let answers = []
        for (let i=0; i<numOfAnswers; i++){
            answers.push(
                <AnswerForm option={i} key={i} numOfAnswers={numOfAnswers} setNumOfAnswers={setNumOfAnswers}/>
            )
        }
        return answers
    }

    React.useEffect(() => {
        if(type === "EDIT" && props.quiz){
            for(let i=0; i<props.quiz.answerOptions.length; i++){
                props.setAnswer(i, props.quiz.answerOptions[i])
            }
            props.setCorrectAnswer(props.quiz.correctAnswerIndex)
        }
        return () => {
            props.removeAnwers();
        }
      }, []);
    var verified = question !=="" && points !=="" && duration!=="" && props.answers!==[] && props.correctAnswer!==null
    return(
        <div className="container">
            <div className="row">
                <div className="col-12" style={{display:'flex', justifyContent:'center', padding:'1rem 2rem'}}>
                    <h3>{type === "ADD" ? "Tambah Pertanyaan": "Edit Pertanyaan"}</h3>
                </div>
            </div>
            <div className="content">
                <Form onSubmit={submit} style={{minWidth:'50vw'}}>
                    <FormGroup>
                        <Label>Pertanyaan*</Label>
                        <Input type="textarea" id="question" required value={question} placeholder={"Tulis pertanyaan Anda disini"} onChange={(event) => setQuestion(event.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Jawaban*</Label>
                        {makeAnswers()}
                        <div style={{display:'flex', justifyContent:"flex-end"}}>
                            <RButton className="neutral-button" onClick={incrementNumOfAns}>Tambah Pilihan Jawaban</RButton>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label>Setting Pilihan Ganda</Label>
                        <div className="row justify-content-end">
                            <div className="col-11">
                                <FormGroup row>
                                    <Label id="point" sm={3}>Poin Soal Ini*</Label>
                                    <Col sm={9}>
                                        <Input
                                            type="number"
                                            value={points}
                                            onChange={(event) => setPoints(event.target.value)}
                                            required
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={3}>Timer*</Label>
                                    <Col sm={6}>
                                        <Input
                                            type="number"
                                            value={duration}
                                            onChange={(event) => setDuration(event.target.value)}
                                            required
                                        />
                                    </Col>
                                    <Label sm={3}>Detik</Label>
                                </FormGroup>
                            </div>
                        </div>
                    </FormGroup>
                    
                    <div className="row justify-content-end">
                        {type === "ADD" && <div className="col-3">
                            <Button fullWidth className="prof-button" onClick={() => props.changeQuizType(null)}>Kembali</Button>
                        </div>}
                        <div className="col-3">
                            <Button fullWidth className="prof-button" type="submit" disabled={!verified}>{type === "ADD" ? "Tambahkan" : "Edit"}</Button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

function mapStateToProps(state, ownProps){
    var targetQuiz = null;
    if (ownProps.id !== null && ownProps.id !== undefined){
        targetQuiz = state.selectedLecture.quizzes[ownProps.id]
    }
    return{
        lectureId: state.selectedLecture.lectureId,
        answers: state.answers,
        correctAnswer: state.correctAnswer,
        quiz: targetQuiz
    }
}
export default connect(mapStateToProps,{addQuiz, removeAnwers, setAnswer,setCorrectAnswer})(MultipleChoiceQuizForm);