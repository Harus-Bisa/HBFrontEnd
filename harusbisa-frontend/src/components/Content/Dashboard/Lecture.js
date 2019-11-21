import React from "react";
import {connect} from "react-redux";
import QuizCard from "../../Card/QuizCard";
import { Button } from "@material-ui/core";
import Popup from "../../Popup/Popup";

function mapStateToProps(state){
    return {
        lecture: state.selectedLecture
    }
}
function Lecture(props){
    const makeQuizzes = () =>{
        var quizzes = []
        for (let i=0; i<props.lecture.quizzes.length; i++){
            quizzes.push(<QuizCard key={i} index={i}/>)
        }
        return quizzes;
    }
    if (!props.lecture){
        return(
            <div>Make your first lecture</div>
        )
    }
    return(
        <div className="content">
            <header>
                <h1>Sesi {props.lecture.date}</h1>
            </header>
            <div style={{margin:"1rem 0"}}>
                <div className="row">
                    <div className="col-3">
                        <Button fullWidth className="lecture-button">Buka kelas</Button>
                    </div>
                    <div className="col-3">
                        <Popup
                            purpose="Tambah Pertanyaan"
                            trigger={{component:Button, className:"lecture-button"}}
                        />
                    </div>
                    <div className="col-3">
                        <Popup
                            purpose= {"Statistik sesi"+ props.lecture.date}
                            trigger={{component:Button, className:"lecture-button"}}
                        />
                    </div>
                    <div className="col-3">
                        <Popup
                            purpose= {"Setting sesi"+props.lecture.date}
                            trigger={{component:Button, className:"lecture-button"}}
                        />
                    </div>
                </div>
            </div>
            <div>
                {makeQuizzes()}
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(Lecture);
