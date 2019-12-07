import React from "react";
import {connect} from "react-redux";
import { Button } from "@material-ui/core";
import ButtonIcon from "../../../ButtonIcon/ButtonIcon";
import StatisticIcon from '@material-ui/icons/Equalizer';
import AnswerIcon from '@material-ui/icons/CheckCircleOutlined';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import { setLiveQuiz } from "../../../../redux/actions";

function LiveMenu(props){
    var [isOpen, setIsOpen] = React.useState(false)
    const makeDropdownItems = () =>{
        var components = []
        for (let i=0;i<props.numberOfQuizzes; i++){
            if(i !== props.liveQuizIndex){
                components.push(<DropdownItem onClick={() => props.setLiveQuiz(i)}>Pertanyaan {i+1}</DropdownItem>)
            }
        }
        return components
    }
    return(
        <div className="live-menu">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Button id="control-button">Mulai</Button>
                    </div>
                    <div className="col">
                        <Dropdown id="change-quiz" direction="up" isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
                            <DropdownToggle caret>
                                Pertanyaan {props.liveQuizIndex+1}
                            </DropdownToggle>
                            <DropdownMenu>
                                {makeDropdownItems()}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className="col">
                        <ButtonIcon icon={AnswerIcon}/>
                        <ButtonIcon icon={StatisticIcon}/>
                    </div>
                    <div className="col">
                        <Button>Timer</Button>
                    </div>
                    <div className="col">
                        <p style={{margin:'auto'}}>120</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        numberOfQuizzes: state.selectedLecture.quizzes.length,
        liveQuizIndex: state.liveQuiz.index
    }
}
export default connect(mapStateToProps,{setLiveQuiz})(LiveMenu);