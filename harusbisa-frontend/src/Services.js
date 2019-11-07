import axios from "axios";
import decode from 'jwt-decode';

class Services{
    constructor(){
        this.domain = "http://localhost:8080/api"; // https://www/api.harusbisa.net/api
    }

    // AUTHENTICATION RELATED
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
        })
        .catch(error => {
            console.log(error.message)
        })
    }

}

const services = new Services()
export default services;