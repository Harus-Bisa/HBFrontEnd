import React from "react"
import { Form, FormGroup, Label, Input, Button as RButton, Col} from 'reactstrap';
import {connect} from "react-redux";
import { Button } from "@material-ui/core";
import AnswerForm from "./AnswerForm";

function QuizForm(props){
    var [question, setQuestion] = React.useState("")
    var [numOfAnswers, setNumOfAnswers] = React.useState(2)
    var [points, setPoints] = React.useState(1)
    var [time, setTime] = React.useState(60)
    
    const submit = (event) =>{
        event.preventDefault();
    }
    const incrementNumOfAns = () =>{
        setNumOfAnswers(numOfAnswers + 1)
    }
    const makeAnswers = () =>{
        let answers = []
        for (let i=0; i<numOfAnswers; i++){
            answers.push(
                <AnswerForm option={i} key={i}/>
            )
        }

        return answers
    }
    var verified = question && points
    return(
        <div className="container">
            <div className="row">
                <div className="col-12" style={{display:'flex', justifyContent:'center', padding:'1rem 2rem'}}>
                    <h3>Tambah Pertanyaan</h3>
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
                                            value={time}
                                            onChange={(event) => setTime(event.target.value)}
                                            required
                                        />
                                    </Col>
                                    <Label sm={3}>Detik</Label>
                                </FormGroup>
                            </div>
                        </div>
                    </FormGroup>
                    
                    <div className="row justify-content-end">
                        <div className="col-3">
                            <Button fullWidth className="prof-button">Kembali</Button>
                        </div>
                        <div className="col-3">
                            <Button fullWidth className="prof-button" type="submit" disabled={!verified}>Tambahkan</Button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default connect()(QuizForm);