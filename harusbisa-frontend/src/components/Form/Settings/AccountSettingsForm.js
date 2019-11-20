import React from "react";
import {connect} from "react-redux";
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';

function AccountSettingsForm(props){
    var [firstName, setFirstName] = React.useState(props.firstName);
    var [lastName, setLastName] = React.useState(props.lastName);
    var [school, setSchool] = React.useState(props.school);
    var [email, setEmail] = React.useState(props.email);

    var [oldPassword, setOldPassword] = React.useState();
    var [newPassword, setNewPassword] = React.useState();
    var [verifyNewPassword, setVerifyNewPassword] = React.useState();

    const submitProfile = (event) =>{
        event.preventDefault();
        props.changeProfile()
    }

    if(props.loading){
        return <p>Loading</p>
    }
    return(
        <div>
            <div className="content" style={{borderBottom:"2px solid #F4F4F4", paddingLeft: 0, paddingRight:0}}>
                <div>
                    <h5>Basic</h5>
                </div>
                <div className="row justify-content-end">
                    <div className="col-md-11">
                        <Form onSubmit={submitProfile} id="profile-form">
                            <FormGroup row>
                                <Label sm={5}>Nama Depan</Label>
                                <Col sm={7}>
                                    <Input type="text" id="firstName" value={firstName} onChange={(event) => setFirstName(firstName = event.target.value) }/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={5}>Nama Belakang</Label>
                                <Col sm={7}>
                                    <Input type="text" id="lastName" value={lastName} onChange={(event) => setLastName(lastName = event.target.value)}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={5}>Nama Universitas</Label>
                                <Col sm={7}>
                                    <Input type="text" id="school" value={school} onChange={(event) => setSchool(school= event.target.value)}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={5}>Email</Label>
                                <Col sm={7}>
                                    <Input type="email" id="email" value={email} onChange={(event) => setEmail(email = event.target.value)}/>
                                </Col>
                            </FormGroup>
                            <div className="row justify-content-end">
                                <div className="col-sm-7">
                                    <Button type="submit" className="neutral-button" style={{width:'100%'}}>Simpan perubahan</Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            
            <div className="content" style={{paddingLeft: 0, paddingRight:0}}>
                <h5>Password</h5>
                <div className="row justify-content-end">
                    <div className="col-md-11">
                        <p style={{marginBottom:'2rem'}}>Dengan membuat password memastkan anda dapat log in ke akun Harus Bisa anda</p>
                        <Form onSubmit={submitProfile} id="password-form">
                            <FormGroup row>
                                <Label sm={5}>Password Lama</Label>
                                <Col sm={7}>
                                    <Input type="text" id="oldPassword" value={oldPassword} onChange={(event) => setOldPassword(oldPassword= event.target.value)}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={5}>Password Baru</Label>
                                <Col sm={7}>
                                    <Input type="text" id="newPassword" value={newPassword} onChange={(event) => setNewPassword(newPassword= event.target.value)}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={5}>Ulangi Password Baru</Label>
                                <Col sm={7}>
                                    <Input type="text" id="verifyNewPassword" value={verifyNewPassword} onChange={(event) => setVerifyNewPassword(verifyNewPassword= event.target.value)}/>
                                </Col>
                            </FormGroup>
                            <div className="row justify-content-end">
                                <div className="col-sm-7">
                                    <Button type="submit" className="neutral-button" style={{width:'100%'}}>Simpan perubahan</Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div> 
        </div>
    )
}

function mapStateToProps(state){
    return{
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        school: state.school,
        loading: state.loading
    }
}

AccountSettingsForm.defaultProps ={
    changeProfile: (() =>{})
}
export default connect(mapStateToProps)(AccountSettingsForm);