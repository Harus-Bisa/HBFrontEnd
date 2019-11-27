import React from "react";
import {Input, CustomInput} from "reactstrap";

export default function AnswerForm(props){
    var [correct, setCorrect] = React.useState(false)
    return(
        <div className="row" style={{marginTop:"15px", marginBottom:'15px'}}>
            <div className="col-1" style={{display:'flex'}}>
                <p style={{margin:'auto'}}>{String.fromCharCode(props.option+65)}.</p>
            </div> 
            <div className="col-11">
                <Input
                    type="textArea"
                    placeholder={"Tulis jawaban anda disini"}
                />
                <CustomInput type="switch" value={correct} label="Jawaban benar" onChange={() => setCorrect(!correct)}/>
            </div>   
        </div>
    )
}