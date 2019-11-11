import React from "react";
import {connect} from "react-redux";
import InsideNavbar from "../../../components/Navbar/InsideNavbar";
import { getUser, getCourses } from "../../../redux/actions";
import { withAuth } from "../../withAuth";
import services from "../../../Services";
import Content from "../../../components/Content/Course/Content";

function mapStateToProps(state){
    return{
        courses: state.courses,
        firstName: state.firstName,
        lastName: state.lastName,
        loading: state.loading
    }
}
class Courses extends React.Component{
    async componentDidMount(){
        await Promise.all([this.props.getUser(), this.props.getCourses()]);
    }
    logout = () =>{
        services.logout();
        this.props.history.push("/")
    }
    render(){
        if (this.props.loading){
            return(<p>Loading</p>)
        }
        return(
            <div>
                <InsideNavbar logout={this.logout}/>
                <div className="container">
                    <div className="row">
                        <div className="col-3" style={{borderRight:"2px solid #f4f4f4"}}>
                            <h2>Selamat datang {this.props.firstName} {this.props.lastName}</h2>
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

export default connect(mapStateToProps,{getCourses, getUser})(withAuth(Courses));