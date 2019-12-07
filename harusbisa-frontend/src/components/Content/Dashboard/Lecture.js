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
import QuizForm from "../../Form/Quiz/QuizForm";

function mapStateToProps(state){
    return {
        lecture: state.selectedLecture,
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
    if (props.cLoading){
        return <p>Loading</p>

    }
    else if(props.error){
        return <ErrorMessage/>
    }
    else{
        var date = convertDate(props.lecture.date)
        var indicator = () =>{
            if (props.live){
                return "Sedang berlangsung"
            }
            else{
                if(props.lecture.hasLived){
                    return "Telah berlangsung"
                }
                else{
                    return "Baru"
                }
            }
        }
        return(
            <div>
                <header>
                    <div className="row">
                        <div className="col-5" style={{display:'flex'}}>
                            <h1 style={{margin:"auto"}}>Sesi {date}</h1>
                        </div>
                        <div className="col" style={{display:'flex', flexDirection:'row'}}>
                            <div className={"circle" + (props.live ? " green" : "")}/>
                            <h5 style={{margin:"auto 0"}}>{indicator()}</h5>
                        </div>
                    </div>
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
                                id={props.lecture.lectureId}
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
