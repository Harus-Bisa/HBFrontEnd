import React from "react";
import {connect} from "react-redux";
import QuizCard from "../../Card/QuizCard";
import { Button } from "@material-ui/core";
import Popup from "../../Popup/Popup";
import PlayIcon from '@material-ui/icons/PlayArrow';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StatisticIcon from '@material-ui/icons/Equalizer';
import LectureButtonContent from "../../LectureButton/LectureButtonContent";

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
    return(
        <div className="content">
            <header>
                <h1>Sesi {props.lecture.date}</h1>
            </header>
            <div style={{margin:"1rem 0"}}>
                <div className="row">
                    <div className="col-3">
                        <Button fullWidth className="lecture-button">
                            <LectureButtonContent icon={PlayIcon} content={"Buka kelas"}/>
                        </Button>
                    </div>
                    <div className="col-3">
                        <Popup
                            purpose={
                                <LectureButtonContent icon={AddIcon} content={"Tambah Pertanyaan"}/>
                            }
                            trigger={{component:Button, className:"lecture-button"}}
                        />
                    </div>
                    <div className="col-3">
                        <Popup
                            purpose={
                                <LectureButtonContent icon={StatisticIcon} content={"Statistik Sesi " + props.lecture.date}/>
                            }
                            trigger={{component:Button, className:"lecture-button"}}
                        />
                    </div>
                    <div className="col-3">
                        <Popup
                            purpose= {<LectureButtonContent icon={MoreVertIcon} content={"Setting Sesi "+props.lecture.date}/>}
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
