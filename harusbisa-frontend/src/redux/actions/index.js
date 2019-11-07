import { COURSES_LOADED } from "../constants/action-types";
import services from "../../Services";

export function getCourses(){
    return async function(dispatch){
        return await services.getCourses()
        .then(async response =>{
            await dispatch({type:COURSES_LOADED, payload:response})
        })
    }
}