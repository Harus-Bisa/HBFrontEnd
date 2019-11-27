import axios from "axios";
import decode from 'jwt-decode';

class Services{
    constructor(){
        this.domain = "http://localhost:8000"; // https://www/api.harusbisa.net/api
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
    setVariables(idToken, userId, role){
        localStorage.setItem('id_token', idToken);
        localStorage.setItem("userId", userId);
        localStorage.setItem("role", role);
    }

    getToken(){
        return localStorage.getItem("id_token");
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
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token)
    }
    
    async login(email, password){
        return axios.post(`${this.domain}/login`,{
            email:email,
            password:password
        })
        .then(response => {
            var userId = response.data.userId;
            var role = response.data.role;
            this.setVariables(response.data.token, userId, role)
            return {
                role: role,
                userId: userId
            }
        })
        .catch(error => {
            throw error
        })
    }

    //USERS
    async getUser(userId){
        const headers = this.createHeaders();
        return await axios.get(this.domain + "/users/"+userId,{
            headers: headers
        })
        .then(response => {
            var data = response.data
            return{
                firstName: data.firstName,
                lastName: data.lastName,
                role: data.role,
                school: data.school,
                email: data.email,
                userId: data.userId
            }
        })
        .catch(error =>{
            throw error
        })
    }

    //COURSES
    async getCourses(role){
        const headers = this.createHeaders();
        const url = this.domain + "/" + role + "/courses" 
        return await axios.get(url,{
            headers: headers
        })
        .then(response => {
            return response.data;
        })
        .catch(error =>{
            throw error;
        })
    }

    async addCourse(courseName, startTerm, endTerm, role){
        const headers = this.createHeaders();
        const data = {
            courseName: courseName,
            startTerm: startTerm,
            endTerm: endTerm
        }
        return await axios.post(this.domain + "/"+role+ "/courses", data, {headers: headers})
        .then(response =>{
            return response.data
        })
        .catch(error => {
            console.log(error.message)
        })
    }
    async studentAddCourse(joinCode){
        const headers = this.createHeaders();
        return await axios.post(this.domain + "/student/courses", {joinCode:joinCode}, {headers: headers})
        .then(response =>{
            return response.data
        })
        .catch(error =>{
            throw error
        })
    }
    async deleteCourse(courseId,role){
        const headers = this.createHeaders();
        return await axios.delete(this.domain + "/"+role+"/courses/" + courseId, {headers:headers})
        .then(response =>{
            return response.data
        })
        .catch(error =>{
            throw error
        })
    }

    async editCourse(courseId, courseName, startTerm, endTerm, role){
        const headers = this.createHeaders();
        const data = {
            courseName: courseName,
            startTerm: startTerm,
            endTerm: endTerm
        }
        return await axios.put(this.domain + "/"+role+ "/courses/" + courseId, data, {headers: headers})
        .then(response =>{
            return response.data
        })
        .catch(error =>{
            throw error
        })
    }

    async getCourse(courseId, role){
        const headers = this.createHeaders();
        return await axios.get(this.domain + "/" + role + "/courses/" + courseId,{headers:headers})
        .then(async response =>{
            var course= response.data
            return await this.getLectures(courseId, role)
            .then(lectures =>{
                course.lectures = lectures;
                return course
            })
        })
        .catch(error=>{
            throw error
        })
    }
    // LECTURES
    async getLectures(courseId, role){
        const headers = this.createHeaders();
        return await axios.get(this.domain + "/"+role+"/courses/"+courseId+"/lectures",{
            headers:headers
        })
        .then(response =>{
            return response.data;
        })
        .catch(error =>{
            throw error
        })
    }

    async addLecture(date, lectureDescription, participationRewardPercentage, courseId, role){
        const headers = this.createHeaders();
        const url = this.domain + "/" + role + "/courses/" + courseId + "/lectures"; 
        const data = {
            date: date,
            lectureDescription: lectureDescription,
            participationRewardPercentage: participationRewardPercentage
        }

        return await axios.post(url, data, {headers: headers})
        .then(response =>{
            return response.data
        })
        .catch(error => {
            console.log(error.message)
        })
    }

    async getQuizzes(lectureId, role){
        const headers = this.createHeaders();
        const url = this.domain + "/" + role + "/lectures/" + lectureId + "/quizzes" 
        return await axios.get(url,{
            headers:headers
        })
        .then(response =>{
            return response.data;
        })
        .catch(error =>{
            throw error
        })
    }
}

const services = new Services()
export default services;