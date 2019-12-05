import React from "react";
import { withAuth } from "../../withAuth";
import {getCourse, changeContentType} from "../../../redux/actions";
import {connect} from "react-redux";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Lecture from "../../../components/Content/Dashboard/Lecture";
import Home from "../../../components/Content/Dashboard/Home";
import Settings from "../../../components/Content/Dashboard/Settings";
import { Button } from "@material-ui/core";

function mapStateToProps(state){
    return{
        loading: state.loading,
        course: state.course,
        contentType: state.contentType,
        role: state.role
    }
    
}
const HOME = "HOME";
const LECTURE = "LECTURE";
const GRADEBOOK = "GRADEBOOK";
const SETTINGS = "SETTINGS";

class ProfDashboard extends React.Component{
    constructor(props){
        super(props)
        this.goToHome = this.goToHome.bind(this);
    }
    componentDidMount(){
        const courseId = this.props.match.params.id
        var role = this.props.role ? this.props.role : localStorage.getItem("role")
        this.props.getCourse(courseId, role);
        this.goToHome()
    }
    goToHome(){
        this.props.changeContentType(HOME)
    }
    render(){
        if (this.props.loading){
            return(<p>Loading</p>)
        }
    
        return(
            <div style={{position:'fixed', width:'100%'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-2">
                            <Sidebar/>
                        </div>
                        <div className="col" style={{overflow:'auto', maxHeight:'95vh'}}>
                            <div className="content">
                                {this.props.contentType !== HOME && <Button onClick={this.goToHome}>{this.props.course.courseName}</Button>}
                                {this.props.contentType === HOME && <Home/>}
                                {this.props.contentType === LECTURE && <Lecture/>}
                                {this.props.contentType === SETTINGS && <Settings/>}
                                {this.props.contentType === GRADEBOOK && <h1>GRADEBOOK</h1>}
                            </div>
                            
                        </div>
                    </div>
                </div>            
            </div>
        )
    }
}


export default  connect(mapStateToProps, {getCourse, changeContentType})(withAuth(ProfDashboard));