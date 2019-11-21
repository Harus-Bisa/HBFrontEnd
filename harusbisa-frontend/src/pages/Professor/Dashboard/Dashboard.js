import React from "react";
import { withAuth } from "../../withAuth";
import {getLectures, changeContentType} from "../../../redux/actions";
import {connect} from "react-redux";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Lecture from "../../../components/Content/Dashboard/Lecture";
import Home from "../../../components/Content/Dashboard/Home";

function mapStateToProps(state){
    return{
        loading: state.loading,
        course: state.course,
        contentType: state.contentType
    }
    
}
const HOME = "HOME";
const LECTURE = "LECTURE";
const GRADEBOOK = "GRADEBOOK";
const SETTINGS = "SETTINGS";

class ProfDashboard extends React.Component{
    componentDidMount(){
        const courseId = this.props.match.params.id
        this.props.getLectures(courseId);
        this.props.changeContentType(HOME);
    }
    render(){
        if (this.props.loading){
            return(<p>Loading</p>)
        }
    
        return(
            <div style={{position:'fixed', width:'100%'}}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2">
                            <Sidebar/>
                        </div>
                        <div className="col">
                            {this.props.contentType === HOME && <Home/>}
                            {this.props.contentType === LECTURE && <Lecture/>}
                            {this.props.contentType === SETTINGS && <h1>SETTINGS</h1>}
                            {this.props.contentType === GRADEBOOK && <h1>GRADEBOOK</h1>}
                        </div>
                    </div>
                </div>            
            </div>
        )
    }
}


export default  connect(mapStateToProps, {getLectures, changeContentType})(withAuth(ProfDashboard));