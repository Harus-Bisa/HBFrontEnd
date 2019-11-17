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
    return(
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm">
                    <div className="content">

                        <div className="row" style={{borderBottom:'4px solid #f4f4f4'}}>
                            <div className="col-md-6">
                                <h1>Settings</h1>
                            </div>
                            <div className="col-md-6" style={{display:'flex'}}>
                                <div className="row" style={{margin: "auto"}}>
                                    <div className="col-6">
                                        <Button onClick={() => setSettingDisplay(settingDisplay=ACCOUNT)}>Akun</Button>
                                    </div>
                                    <div className="col-6">
                                        <Button onClick={() => setSettingDisplay(settingDisplay=COURSE)}>Kelas</Button>
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


export default connect(null)(withAuth(Settings));