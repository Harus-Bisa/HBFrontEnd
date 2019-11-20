import React from "react";
import {connect} from "react-redux";
import { withAuth } from "../withAuth";
import AccountSettingsForm from "../../components/Form/Settings/AccountSettingsForm";
import StudentCourseSettingsForm from "../../components/Form/Settings/StudentCourseSettingsForm";
import { Button } from "@material-ui/core";
const ACCOUNT = "ACCOUNT";
const COURSE = "COURSE"

function Settings(props){
    var [settingDisplay, setSettingDisplay] = React.useState(ACCOUNT);
    if (props.loading){
        return null
    }
    const arrowUpStyle = {
        width: 0, 
        height: 0, 
        borderLeft: "5px solid transparent",  
        borderRight: "5px solid transparent",
        borderBottom: "5px solid #f4f4f4",
        fontsize: 0,
        lineheight: 0,
    }
    return(
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm">
                    <div className="content">
                        <div style={{borderBottom:'4px solid #f4f4f4'}}>
                            <div className="row" >
                                <div className="col-md-6">
                                    <h1 style={{margin:'0'}}>Settings</h1>
                                </div>
                                <div className="col-md-6" style={{display:'flex'}}>
                                    <div className="row" style={{margin: "auto"}}>
                                        <div className="col-6">
                                            <Button className= "button settings-button" id={ACCOUNT+"-button"} onClick={() => setSettingDisplay(settingDisplay=ACCOUNT)}>Akun</Button>
                                        </div>
                                        <div className="col-6">
                                            <Button className= "button settings-button" id={COURSE+"-button"} onClick={() => setSettingDisplay(settingDisplay=COURSE)}>Kelas</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-end">
                                <div className="col-md-6">
                                    <div className="row" style={{margin: "auto"}}>
                                        <div className="col-6">
                                            <div style={{display:'flex', justifyContent:"center"}}><div style={(settingDisplay === ACCOUNT ? arrowUpStyle : {})} id={ACCOUNT}/></div>
                                        </div>
                                        <div className="col-6">
                                            <div style={{display:'flex', justifyContent:"center"}}><div style={(settingDisplay === COURSE ? arrowUpStyle : {})} id={COURSE}/></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            {settingDisplay === ACCOUNT && <AccountSettingsForm/>}
                            {settingDisplay === COURSE && <StudentCourseSettingsForm/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return {
        loading: state.loading
    }
}

export default connect(mapStateToProps)(withAuth(Settings));