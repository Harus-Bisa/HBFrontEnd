import { COURSES_LOADED, COURSE_LOADED, CHANGE_SELECTED_LECTURE, ADD_COURSE, DELETE_COURSE } from "../constants/action-types";
import services from "../../Services";

export function getCourses(){
    return async function(dispatch){
        return await services.getCourses()
        .then(async response =>{
            await dispatch({type:COURSES_LOADED, payload:response})
        })
    }
}

export function getLectures(courseId){
    return async function(dispatch){
        return await services.getLectures(courseId)
        .then(async response => {
            await dispatch({type:COURSE_LOADED, payload: response})
        })
    }
}

export function changeSelectedLecture(payload){
    return{type: CHANGE_SELECTED_LECTURE, payload:payload}
}

export function addCourse(name, startDate, endDate){
    return async function(dispatch){
        return await services.addCourse(name, startDate, endDate)
        .then(async response => {
            await dispatch({type: ADD_COURSE, payload: response})
        })
    }
}

export function deleteCourse(courseId){
    return async function(dispatch){
        return await services.deleteCourse(courseId)
        .then(async response =>{
            await dispatch({type:DELETE_COURSE, payload: response})
        })
    }
}