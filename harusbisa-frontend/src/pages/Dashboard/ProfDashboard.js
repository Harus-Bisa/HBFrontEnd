import React from "react";
import { withAuth } from "../withAuth";
import {getLectures} from "../../redux/actions";
import {connect} from "react-redux";
import Sidebar from "../../components/Sidebar/Sidebar";
import Content from "../../components/Content/Content";

function mapStateToProps(state){
    return{
        loading: state.loading,
        course: state.course
    }
    
}

class ProfDashboard extends React.Component{
    componentDidMount(){
        const courseId = this.props.match.params.id
        this.props.getLectures(courseId);
    }
    render(){
        if (this.props.loading){
            return(<p>Loading</p>)
        }
    
        return(
            <div>
                <header>
                    <p>{this.props.course.course_name}</p>
                </header>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-2">
                            <Sidebar/>
                        </div>
                        <div className="col">
                            <Content/>
                        </div>
                    </div>
                </div>            
            </div>
        )
    }
}


export default  connect(mapStateToProps, {getLectures})(withAuth(ProfDashboard));