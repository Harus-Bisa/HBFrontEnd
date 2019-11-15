import axios from "axios";
import decode from 'jwt-decode';

class Services{
    constructor(){
        this.domain = "http://localhost:8080/api"; // https://www/api.harusbisa.net/api
    }
    //HEADERS
    createHeaders(){
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.isLoggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return headers;
    }

    // AUTHENTICATION
    setToken(idToken){
        localStorage.setItem('id_token', idToken);
    }

    getToken(){
        return localStorage.getItem('id_token');
    }

    isTokenExpired(token){
        try{
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000){
                return true;
            }
            else{
                return false;
            }
        }
        catch(e){
            return false;
        }
    }

    logout(){
        localStorage.removeItem('id_token')
    }
    
    isLoggedIn(){
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token)
    }

    async login(email, password){
        return axios.post(`${this.domain}/login`,{
            email:email,
            password:password
        })
        .then(response => {
            this.setToken(response.data.token)
            return this.getUser()
        })
        .catch(error => {
            console.log(error.message)
        })
    }

    //USERS
    async getUser(){
        const headers = this.createHeaders();
        return await axios.get(this.domain + "/courses",{
            headers: headers
        })
        .then(response => {
            var data = response.data.data
            return{
                firstName: data.first_name,
                lastName: data.last_name,
                role: data.role
            }
        })
        .catch(error =>{
            console.log(error.message);
        })
    }

    //COURSES
    async getCourses(){
        const headers = this.createHeaders();
        return await axios.get(this.domain + "/courses",{
            headers: headers
        })
        .then(response => {
            return response.data.data.courses;
        })
        .catch(error =>{
            console.log(error.message);
        })
    }

    async addCourse(courseName, startTerm, endTerm){
        const headers = this.createHeaders();
        const data = {
            course_name: courseName,
            start_term: startTerm,
            end_term: endTerm
        }
        return await axios.post(this.domain + "/courses", data, {headers: headers})
        .then(response =>{
            return response.data.data.courses
        })
        .catch(error => {
            console.log(error.message)
        })
    }
    async studentAddCourse(join_code){
        const headers = this.createHeaders();
        return await axios.post(this.domain + "/courses", {join_code:join_code}, {headers: headers})
        .then(response =>{
            return response.data.data.courses
        })
        .catch(error =>{
            throw error
        })
    }
    async deleteCourse(courseId){
        const headers = this.createHeaders();
        return await axios.delete(this.domain + "/courses/" + courseId, {headers:headers})
        .then(response =>{
            return response.data.data.courses
        })
        .catch(error =>{
            console.log(error.message)
        })
    }

    async editCourse(courseId, courseName, startTerm, endTerm){
        const headers = this.createHeaders();
        const data = {
            course_name: courseName,
            start_term: startTerm,
            end_term: endTerm
        }
        return await axios.put(this.domain + "/courses/" + courseId, data, {headers: headers})
        .then(response =>{
            return response.data.data.courses
        })
        .catch(error =>{
            console.log(error.message)
        })
    }

    // LECTURES
    async getLectures(courseId){
        const headers = this.createHeaders();
        return await axios.get(this.domain + "/courses/"+courseId+"/lectures",{
            headers:headers
        })
        .then(response =>{
            return response.data.data;
        })
        .catch(error =>{
            console.log(error.message)
        })
    }
}

const services = new Services()
export default services;