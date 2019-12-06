import React from "react";
import {connect} from "react-redux";
import {Form, FormGroup, Label, Col, Input} from "reactstrap";
import {Button} from "@material-ui/core";
import { signup } from "../../redux/actions";
import ErrorMessage from "../Error/ErrorMessage";
import {withRouter} from "react-router-dom";

function SignUpForm(props){
    var [firstName, setFirstName] = React.useState("")
    var [lastName, setLastName] = React.useState("")
    var [email, setEmail] = React.useState("")
    var [school, setSchool] = React.useState("")
    var [role, setRole] = React.useState("")
    var [password, setPassword] = React.useState("")

    var verified = firstName && lastName && email && school && role && password;
    const submit = (event) =>{
        event.preventDefault();
        props.signup(firstName, lastName, email, school, role, password);
        if (!props.error){
            props.history.push("/login")
        }
    }
    return(
        <div className="container">
            {props.error && <ErrorMessage/>}
            <Form onSubmit={submit}>
                <FormGroup row>
                    <Label sm={3}>Nama Depan</Label>
                    <Col sm={9}>
                        <Input type="text" id="firstName" value={firstName} onChange={(event) => setFirstName(event.target.value)}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3}>Nama Belakang</Label>
                    <Col sm={9}>
                        <Input type="text" id="lastName" value={lastName} onChange={(event) => setLastName(event.target.value)}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3}>Email</Label>
                    <Col sm={9}>
                        <Input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3}>Perguruan Tinggi</Label>
                    <Col sm={9}>
                        <Input type="text" id="school" value={school} onChange={(event) => setSchool(event.target.value)}/>
                    </Col>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" id="role-faculty" checked={role === "faculty"} onChange={() => setRole("faculty")} />{' '}
                        Dosen
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" id="role-student" checked={role === "student"} onChange={() => setRole("student")}/>{' '}
                        Mahasiswa
                    </Label>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3}>Password</Label>
                    <Col sm={9}>
                        <Input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                    </Col>
                </FormGroup>
                
                <div className="row justify-content-end">
                    <div className="col-3">
                        <Button fullWidth className="prof-button" type="submit" disabled={!verified}>Sign Up!</Button>
                    </div>
                </div>
            </Form>
        </div>
    )

}

function mapStateToProps(state){
    return{
        error: state.error
    }
}
export default connect(mapStateToProps, {signup})(withRouter(SignUpForm))