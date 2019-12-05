import React from "react";
import { Button } from "@material-ui/core";
import multipleChoicePic from "../../../img/multipleChoice.png";
import wordPic from "../../../img/word.png";
import { MULTIPLE_CHOICE } from "./QuizForm";

function QuizTypeForm(props){
    var [image, setImage] = React.useState(multipleChoicePic)
    const style={display:'flex', flexDirection:'column', textAlign:'start', marginTop:"15px", marginBottom:'15px'}
    return(
        <div className="container">
            <div className="row">
                <div className="col-5 content">
                    <div>
                        <Button fullWidth id={"multiple-choice"} onMouseEnter={()=> setImage(multipleChoicePic)} onClick={() => props.changeQuizType(MULTIPLE_CHOICE)}>
                            <div style={style}>
                                <h5>Pilihan Ganda</h5>
                                <p>Tanggal ini akan menjadi nama sesi anda</p>
                            </div>
                        </Button>
                        <Button fullWidth id={"word"} onMouseEnter={()=> setImage(wordPic)}>
                            <div style={style}>
                                <h5>Isian</h5>
                                <p>Tanggal ini akan menjadi nama sesi anda</p>
                            </div>
                        </Button>
                        <Button fullWidth onMouseEnter={()=> setImage(multipleChoicePic)}>
                            <div style={style} id={"numeric"}>
                                <h5>Angka</h5>
                                <p>Tanggal ini akan menjadi nama sesi anda</p>
                            </div>
                        </Button>
                    </div>
                </div>
                <div className="col-7" style={{background:"#EFF1F5"}}>
                    <div style={{display:'flex', height:'100%', width:'100%'}}>
                        <img src={image} alt={"Pilihan Ganda"} style={{margin:'auto'}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizTypeForm;