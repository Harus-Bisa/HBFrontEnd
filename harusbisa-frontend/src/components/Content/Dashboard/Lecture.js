import React from "react";
import {connect} from "react-redux";
import QuizCard from "../../Card/QuizCard";
import { Button } from "@material-ui/core";
import Popup from "../../Popup/Popup";
import PlayIcon from '@material-ui/icons/PlayArrow';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StatisticIcon from '@material-ui/icons/Equalizer';
import StopIcon from "@material-ui/icons/Stop";
import LectureButtonContent from "../../LectureButton/LectureButtonContent";
import { convertDate } from "../../Sidebar/Sidebar";
import LectureForm from "../../Form/LectureForm";
import ErrorMessage from "../../Error/ErrorMessage";
import { changeContentType, setLiveLecture } from "../../../redux/actions";
import QuizForm from "../../Form/QuizForm";

function mapStateToProps(state){
    return {
        lecture: state.selectedLecture,
        courseName: state.course.courseName,
        error: state.error,
        cLoading: state.cLoading,
        live: state.live
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
    const goToHome = () =>{
        props.changeContentType("HOME")
    }
    
    if (props.cLoading){
        return <p>Loading</p>

    }
    else if(props.error){
        return <ErrorMessage/>
    }
    else{
        const date = convertDate(props.lecture.date)
        return(
            <div className="content">
                <header>
                    <Button onClick={goToHome}>{props.courseName}</Button>
                    <h1>Sesi {date}</h1>
                </header>
                <div style={{margin:"1rem 0"}}>
                    <div className="row">
                        <div className="col-3">
                            <Button fullWidth className="lecture-button" onClick={() => props.setLiveLecture(!props.live)}>
                                <LectureButtonContent icon={props.live ? StopIcon : PlayIcon} content={props.live ? "Tutup kelas":"Buka kelas"}/>
                            </Button>
                        </div>
                        <div className="col-3">
                            <Popup
                                purpose={
                                    <LectureButtonContent icon={AddIcon} content={"Tambah Pertanyaan"}/>
                                }
                                trigger={{component:Button, className:"lecture-button"}}
                                content={QuizForm}
                            />
                        </div>
                        <div className="col-3">
                            <Popup
                                purpose={
                                    <LectureButtonContent icon={StatisticIcon} content={"Statistik Sesi " + date}/>
                                }
                                trigger={{component:Button, className:"lecture-button"}}
                            />
                        </div>
                        <div className="col-3">
                            <Popup
                                purpose= {<LectureButtonContent icon={MoreVertIcon} content={"Setting Sesi "+date}/>}
                                trigger={{component:Button, className:"lecture-button"}}
                                content= {LectureForm}
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
}

export default connect(mapStateToProps,{changeContentType, setLiveLecture})(Lecture);
